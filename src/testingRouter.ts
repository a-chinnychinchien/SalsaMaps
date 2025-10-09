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

interface Testing_Entry {
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
                 async (req: Request<{}, Testing_Entry, Testing_RequestBody>, 
                        res: Response<Testing_Entry | DB_ErrorResponse>) => 
                 {
                    const { title } = req.body;
                    
                    // Runtime Validation
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

    return router;
}