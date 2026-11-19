import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Visual Regression Testing — UI & Layout Integrity', () => {

  test('Visual comparison: Login page layout', async ({ page }) => {
    // Disable stored auth to see login page
    await page.context().clearCookies();
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Verify visual match of the entire login page
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
    });
  });

  test('Visual comparison: Product catalog dashboard layout', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // Verify visual match of the full catalog
    await expect(page).toHaveScreenshot('inventory-catalog.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled',
      mask: [page.locator('.footer_copy')], // Mask dynamic/footer dates if any
    });
  });

  test('Visual comparison: Individual product card component', async ({ page, inventoryPage }) => {
    await page.goto('/inventory.html');
    const firstProductCard = inventoryPage.productItems.first();

    // Component-level visual regression
    await expect(firstProductCard).toHaveScreenshot('product-card-component.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
