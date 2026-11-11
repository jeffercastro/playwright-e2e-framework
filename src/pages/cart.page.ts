import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CartPage: Encapsulates all interactions with the shopping cart page.
 */
export class CartPage extends BasePage {
  // — Locators —
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  // — Actions —
  async getCartItemNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allInnerTexts();
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
