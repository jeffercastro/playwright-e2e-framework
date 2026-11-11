import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../src/pages/login.page';
import { TEST_USERS } from '../../src/data/checkout.data';

/**
 * Global Auth Setup:
 * Logs in ONCE before all tests and saves the browser session (cookies + localStorage)
 * to .auth/session.json. All test projects reuse this session via storageState,
 * eliminating redundant login steps and dramatically reducing test execution time.
 */
const authFile = path.join(__dirname, '../../.auth/session.json');

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);

  // Verify login was successful before saving session
  await expect(page).toHaveURL(/inventory/);

  // Save the authenticated browser state
  await page.context().storageState({ path: authFile });
});
