import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  // Base URL is crucial for API tests
  use: {
    // Playwright will automatically prefix all test calls with this URL
    baseURL: `http://localhost:${process.env.PORT}`, 
    trace: 'on-first-retry',
  },
  testDir: './tests', // Location of your test files
  // ... other standard config options
});

//Run tests via: `npx playwright test`