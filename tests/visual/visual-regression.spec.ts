import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Visual Regression Testing — UI & Layout Integrity', () => {

  // Visual snapshot comparisons are focused on Chromium to prevent OS font rendering false-positives
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Visual regression baseline is anchored on Chromium');
  });

  test('Visual comparison: Login page layout', async ({ page }) => {
    await page.context().clearCookies();
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  });

  test('Visual comparison: Product catalog dashboard layout', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    await expect(page).toHaveScreenshot('inventory-catalog.png', {
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
      mask: [page.locator('.footer_copy')],
    });
  });

  test('Visual comparison: Individual product card component', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    const firstProductCard = inventoryPage.productItems.first();

    await expect(firstProductCard).toHaveScreenshot('product-card-component.png', {
      maxDiffPixelRatio: 0.1,
    });
  });
});
