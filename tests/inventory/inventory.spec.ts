import { test, expect } from '../../src/fixtures/base.fixture';
import { PRODUCTS } from '../../src/data/checkout.data';

/**
 * Inventory Tests — reuse authenticated session via storageState.
 * Tests navigate directly to /inventory without repeating login.
 */
test.describe('Inventory — Product Catalog', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('should display the product catalog page correctly', async ({ inventoryPage }) => {
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    const count = await inventoryPage.productItems.count();
    expect(count).toBe(6);
  });

  test('should sort products by name A to Z (default)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should sort products by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should update cart badge when adding a product', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCartByName(PRODUCTS.backpack);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });

  test('should update cart badge when adding multiple products', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCartByName(PRODUCTS.backpack);
    await inventoryPage.addProductToCartByName(PRODUCTS.bikeLight);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(2);
  });
});
