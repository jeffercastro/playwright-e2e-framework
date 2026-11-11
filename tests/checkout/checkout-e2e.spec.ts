import { test, expect } from '../../src/fixtures/base.fixture';
import { generateCustomerInfo, PRODUCTS } from '../../src/data/checkout.data';

/**
 * Checkout E2E Tests — Full purchase lifecycle.
 * Demonstrates API-free data isolation: each test starts from inventory.
 * Session is reused via storageState (no login repetition).
 */
test.describe('Checkout — Full Purchase Lifecycle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('should complete a full E2E purchase with one item', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. ADD PRODUCT TO CART
    await inventoryPage.addProductToCartByName(PRODUCTS.backpack);
    expect(await inventoryPage.getCartCount()).toBe(1);

    // 2. GO TO CART AND VERIFY
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart/);
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(PRODUCTS.backpack);

    // 3. PROCEED TO CHECKOUT STEP 1
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);

    // 4. FILL CUSTOMER INFORMATION
    const customer = generateCustomerInfo();
    await checkoutPage.fillCustomerInfo(customer);
    await expect(page).toHaveURL(/checkout-step-two/);

    // 5. VERIFY ORDER SUMMARY (MATH VALIDATION)
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    // Validate that total = subtotal + tax (accounting for floating point)
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // 6. FINISH ORDER
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);

    // 7. VERIFY CONFIRMATION SCREEN
    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');
  });

  test('should complete a full E2E purchase with multiple items', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. ADD MULTIPLE PRODUCTS
    await inventoryPage.addProductToCartByName(PRODUCTS.backpack);
    await inventoryPage.addProductToCartByName(PRODUCTS.bikeLight);
    expect(await inventoryPage.getCartCount()).toBe(2);

    // 2. VERIFY BOTH IN CART
    await inventoryPage.goToCart();
    expect(await cartPage.getCartItemCount()).toBe(2);

    // 3. CHECKOUT FLOW
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(generateCustomerInfo({ firstName: 'Jane' }));

    // 4. MATH VALIDATION
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // 5. COMPLETE ORDER
    await checkoutPage.finishCheckout();
    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toBe('Thank you for your order!');
  });

  test('should show error when checkout info fields are empty', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addProductToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Try to continue without filling any fields
    await checkoutPage.fillCustomerInfo({ firstName: '', lastName: '', postalCode: '' });

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('should allow removing an item from the cart before checkout', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCartByName(PRODUCTS.backpack);
    await inventoryPage.addProductToCartByName(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(2);

    await cartPage.removeItemByName(PRODUCTS.backpack);

    expect(await cartPage.getCartItemCount()).toBe(1);
    const remaining = await cartPage.getCartItemNames();
    expect(remaining).not.toContain(PRODUCTS.backpack);
    expect(remaining).toContain(PRODUCTS.bikeLight);
  });
});
