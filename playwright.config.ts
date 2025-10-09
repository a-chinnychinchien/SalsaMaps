import { defineConfig } from '@playwright/test';
import 'dotenv/config';

const serverAddress=`http://localhost:${process.env.PORT}`;

export default defineConfig({
  testDir: './tests', // Location of your test files

  use: {
    // Playwright will automatically prefix all test calls with this URL
    baseURL: serverAddress, 
    trace: 'on-first-retry',
  },

  // TODO: Make this work
  // // Automatically start server before running tests
  // webServer: {
  //   command: 'npm run start:dev', 
  //   url: serverAddress,
  //   timeout: 120 * 1000, 
  //   reuseExistingServer: false,
  // },
});

//Run tests via: `npx playwright test`