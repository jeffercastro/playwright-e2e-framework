import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { TEST_USERS } from '../../src/data/checkout.data';

/**
 * Login Tests — run WITHOUT the authenticated session (no storageState)
 * because we need to test the login form itself.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login — Authentication Flows', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error when logging in with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('should show error when logging in with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.invalid.username, TEST_USERS.invalid.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should show error when username field is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', TEST_USERS.standard.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('should show error when password field is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TEST_USERS.standard.username, '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });
});
