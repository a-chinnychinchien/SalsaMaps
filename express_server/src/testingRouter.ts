import { Router, Request, Response } from 'express';
import { Client } from 'pg';

// --- Type Definitions ---
interface SuccessResponse_GET {
    message: string;
    count: number;
    data: any[]; 
}

type DB_ErrorResponse = { error: string; details?: string };

interface Testing_RequestBody {
    title: string;
}

interface Event_Entry {
    id: number;
    title: string;
    inserted_at: string;
    updated_at: string;
}

/**
 * Creates and configures the router with all route handlers
 * for the /api/testing route
 * @param dbClient The connected PostgreSQL client.
 * @param table_name The name of the table to operate on.
 * @returns An Express Router instance.
 */
export function setupTestingRoutes(dbClient: Client, table_name: string): Router {
    const router = Router();

    // --- GET /testing (Read All) ---
    router.get('/api/testing', async (req: Request, res: Response<SuccessResponse_GET|DB_ErrorResponse>) => {
        console.log(`Received GET request. Querying table: ${table_name}`);
        
        try {
            // Select all rows from the table
            const result = await dbClient.query(`SELECT * FROM ${table_name};`);
            
            res.status(200).json({
                message: `Successfully retrieved data from table '${table_name}'`,
                count: result.rows.length,
                data: result.rows
            });
        } catch (dbError) {
            console.error("Database query error:", dbError);
            res.status(500).json({ 
                error: "Failed to fetch data from the database.",
                details: (dbError as Error).message
            });
        }
    });

    // --- POST /testing (Create New) ---
    router.post('/api/testing', 
                 async (req: Request<{}, Event_Entry, Testing_RequestBody>, 
                        res: Response<Event_Entry | DB_ErrorResponse>) => 
                 {
                    const { title } = req.body;
                    
                    // Check title validity
                    if (!title || typeof title != "string") {
                        const currentTitle = JSON.stringify(title)
                        return res.status(400).json({ error: `Title must be a string. Recieved ${currentTitle}, which is invalid`});
                    }
                    
                    try {
                        const queryText = `
                            INSERT INTO testing(title)
                            VALUES($1)
                            RETURNING *;
                        `;
                        const values = [title];
                        const result = await dbClient.query(queryText, values);
                        res.status(201).json(result.rows[0]);
                    }
                    catch (postError) {
                        console.error("Database INSERT query error:", postError);
                        res.status(500).json({ 
                            error: "Failed to create data in the database.",
                            details: (postError as Error).message
                        });
                    }
                 }
    );

    router.delete('/api/testing/:id', 
                  async (req: Request<{id: string} >, res: Response<{id: number} | DB_ErrorResponse>) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({error: `Processed id is not an integer: ${req.params.id}`});
        }

        try {
            const queryText = `
                                DELETE FROM ${table_name}
                                WHERE id = ($1)
                                RETURNING id;
                              `;
            const result = await dbClient.query(queryText, [id]);
            return res.status(200).json(result.rows[0]);
        }
        catch (dbError) {
            return res.status(401).json({error: `Failed to delete ${id} in the database.`,
                                         details: (dbError as Error).message})
        }
    });


    router.put('/api/testing/:id', async(req: Request<{id: string}, Event_Entry, Testing_RequestBody>, 
                                         res: Response<Event_Entry | DB_ErrorResponse>) => {
        const eventID = parseInt(req.params.id);

        if (isNaN(eventID)) {
            return res.status(400).json({error: `Improper ID passed to PUT query: ${eventID}`});
        }

        try {
            const queryText = `UPDATE ${table_name}
                               SET title = $1, updated_at = NOW()
                               WHERE id = $2
                               RETURNING *`
            const values = [req.body.title, eventID];
            const putResponse = await dbClient.query(queryText, values);
            
            if (putResponse.rowCount == 0){
                return res.status(401).json({error: `Entry with id ${eventID} not found in DB.`})
            }

            return res.status(200).json(putResponse.rows[0]);
        }
        catch (dbError) {
            return res.status(500).json({error: 'PUT query failed',
                                         details: (dbError as Error).message
            })
        }
    });

    return router;
}