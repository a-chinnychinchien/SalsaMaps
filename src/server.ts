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

        // Define a route handler for GET requests to root URL ("/")
        app.get('/', async (req: Request, res: Response) => {
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

