import express, { Request, Response } from 'express';
import { Client } from 'pg';
import 'dotenv/config';

// Define various constants
const PORT = 3000;
// const PORT = process.env.PORT || 3000;
const TABLE_NAME = 'testing';

// Setup app and DB
const app = express();
const dbClient = new Client({
    connectionString: process.env.SUPABASE_DB_URL,
});
// Middleware
app.use(express.json());

async function startServer() {
    try {
        console.log("Attempting to connect to PostgreSQL database...");
        await dbClient.connect();
        console.log("Successfully connected to Supabase PostgreSQL.");
        
        type SuccessResponse_GET = {
            message: string;
            count: number;
            // Assuming data is an array of objects where keys/types aren't fully known
            data: any[]; 
        };
        type DB_ErrorResponse = { error: string; details?: string };

        // Define GET
        app.get('/api/testing', async (req: Request, res: Response<SuccessResponse_GET|DB_ErrorResponse>) => {
            console.log(`Received request. Querying table: ${TABLE_NAME}`);
            
            try {
                // Select all rows from the table
                const result = await dbClient.query(`SELECT * FROM ${TABLE_NAME};`);
                
                // Send the resulting rows back as JSON
                res.status(200).json({
                    message: `Successfully retrieved data from table '${TABLE_NAME}'`,
                    count: result.rows.length,
                    data: result.rows
                });
            } catch (dbError) {
                // Handle any error that occurs during the database query
                console.error("Database query error:", dbError);
                res.status(500).json({ 
                    error: "Failed to fetch data from the database.",
                    details: (dbError as Error).message
                });
            }
        });

        // Define POST, names of current types are {TABLE_NAME}_*
        interface Testing_RequestBody {
            title: string;
        }

        interface Testing_Entry {
            id: number;
            title: string;
            inserted_at: string;
            updated_at: string;
        }
        app.post('/api/testing', 
                //           req.params, NULL,          req.body
                 async (req: Request<{}, Testing_Entry, Testing_RequestBody>, 
                        res: Response<Testing_Entry | DB_ErrorResponse>) => 
                 {
                    const { title } = req.body; //see type def of `req` above what req.body is
                    // Validate title
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

        // Start the server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });

    } catch (e) {
        // Handle failure to connect to the database upon startup
        console.error("Failed to connect to the database or start server:", e);
        // Exit process if connection fails to prevent running a broken server
        process.exit(1); 
    }
}

// Start the whole application
startServer();

