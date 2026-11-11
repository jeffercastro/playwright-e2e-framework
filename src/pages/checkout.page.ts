import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CustomerInfo } from '../data/checkout.data';

/**
 * CheckoutPage: Covers the full 3-step checkout flow.
 *  Step 1: Customer info form
 *  Step 2: Order overview with price validation
 *  Step 3: Order confirmation (success screen)
 */
export class CheckoutPage extends BasePage {
  // — Step 1: Customer Info —
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // — Step 2: Overview —
  readonly summaryItems: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;

  // — Step 3: Confirmation —
  readonly confirmationHeader: Locator;
  readonly confirmationText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);

    // Step 1
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2
    this.summaryItems = page.locator('.cart_item');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    // Step 3
    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationText = page.locator('.complete-text');
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  // — Step 1 Actions —
  async fillCustomerInfo(info: CustomerInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return this.errorMessage.innerText();
  }

  // — Step 2 Actions —
  async getSubtotal(): Promise<number> {
    const text = await this.summarySubtotal.innerText();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax(): Promise<number> {
    const text = await this.summaryTax.innerText();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.summaryTotal.innerText();
    return parseFloat(text.replace('Total: $', ''));
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  // — Step 3 Actions —
  async getConfirmationHeader(): Promise<string> {
    await this.waitForElement(this.confirmationHeader);
    return this.confirmationHeader.innerText();
  }

  async goBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
