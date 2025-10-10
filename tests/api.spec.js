import { test, expect } from '@playwright/test';

// Define the name of the endpoint being tested, baseURL (from PlayWright config) is prepended.
const endpointURL = `/api/testing`; 
        
test.describe('API Endpoint: /api/testing', () => {

    /**
     * Test successful POST
     */
    test('should successfully create a new item and return 201 status', async ({ request }) => {
        const uniqueTitle = `Playwright E2E POST Test - ${Date.now()}`;

        const postResponse = await request.post(endpointURL, {
            data: { title: uniqueTitle },
        });

        expect(postResponse.status()).toBe(201); 
        const body = await postResponse.json();
        expect(body).toHaveProperty('id');
        expect(body.title).toBe(uniqueTitle);
    });

    /**
     * Test POST with bad input fails as expected
     */
    test('should return 400 status for invalid data type (e.g., number)', async ({ request }) => {
        const invalidValue = 98765;
        
        const postResponse = await request.post(endpointURL, {
            data: { title: invalidValue },
        });

        expect(postResponse.status()).toBe(400); 

        const body = await postResponse.json();
        
        // Assert that the error message contains the specific received value
        expect(body.error).toContain(JSON.stringify(invalidValue));
    });
    
    /**
     * Test GET, retrieval of all items at this endpoint
     */
    test('should retrieve a list of items and include a recently created item', async ({ request }) => {
        // Arrange: POST a known item first to guarantee something exists in the database.
        const knownTitle = `GET Check Item - ${Date.now()}`;
        const postResponse = await request.post(endpointURL, {
            data: { title: knownTitle },
        });
        expect(postResponse.status()).toBe(201);
        const createdItem = await postResponse.json();

        // Act: Send the GET request to retrieve the full collection.
        const getResponse = await request.get(endpointURL);

        // Assert: Check response status and content.
        expect(getResponse.status()).toBe(200);
        const body = await getResponse.json();

        // Check the structure of the successful response
        expect(body).toHaveProperty('data');
        expect(Array.isArray(body.data)).toBe(true);
        expect(body.count).toBe(body.data.length);
        
        // Check that the list contains the item we just created using its ID.
        const foundItem = body.data.find(item => item.id === createdItem.id);

        expect(foundItem).toBeDefined();
        expect(foundItem.title).toBe(knownTitle);
    });

    /**
     * Test DELETE
     * 1. Works correctly with correct input/DB state
     * 2. Fails with improper input
     */
    // 1
    test('Delete existing entry in DB with proper return status', async ({ request }) => {
        // Insert a known entry (depends on PUT working)
        const knownTitle = `TO BE DELETED - ${Date.now()}`;
        const postResponse = await request.post(endpointURL, {
            data: { title: knownTitle },
        });
        expect(postResponse.status()).toBe(201);
        const createdItem = await postResponse.json();
        const knownID = createdItem.id;

        const delResponse = await request.delete(`${endpointURL}/${knownID}`);
        const parsedResponse = await delResponse.json();
        expect(delResponse.status()).toBe(200);
        expect(parsedResponse.id).toBe(knownID);
    });

    // 2
    test('Delete returns expected failures when input is incorrect', async ({ request }) => {
        const badID = 'abd';
        const delResponse = await request.delete(`${endpointURL}/${badID}`);
        expect(delResponse.status()).toBe(400);
    });
});
