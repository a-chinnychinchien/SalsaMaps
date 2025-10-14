/**
 * Config file for PlayWright E2E integration tests.
 * Run tests via: `npx playwright test`
 */

import { defineConfig } from '@playwright/test';
import 'dotenv/config';

const serverAddress=`http://localhost:${process.env.PORT}`;

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: serverAddress, // test routes are prefixed with `baseURL`
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
