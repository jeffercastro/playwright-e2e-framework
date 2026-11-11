import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export type SortOption =
  | 'az'   // Name (A to Z)
  | 'za'   // Name (Z to A)
  | 'lohi' // Price (low to high)
  | 'hilo'; // Price (high to low)

/**
 * InventoryPage: Encapsulates all interactions with the product catalog.
 */
export class InventoryPage extends BasePage {
  // — Locators —
  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly productItems: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  // — Actions —
  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productItems.locator('.inventory_item_name').allInnerTexts();
  }

  async getProductPrices(): Promise<number[]> {
    const rawPrices = await this.productItems
      .locator('.inventory_item_price')
      .allInnerTexts();
    return rawPrices.map((p) => parseFloat(p.replace('$', '')));
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const item = this.productItems.filter({ hasText: productName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}
