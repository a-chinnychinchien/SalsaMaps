import express, { Request, Response } from 'express';
import { Client } from 'pg';
import 'dotenv/config';
import { setupTestingRoutes } from './testingRouter';

// Define various constants
const PORT = process.env.PORT || 4000;
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

        // Set up router for /api/testing route
        const testingRouter = setupTestingRoutes(dbClient, TABLE_NAME);
        app.use('/', testingRouter);

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

