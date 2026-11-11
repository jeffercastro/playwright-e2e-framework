import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage: Encapsulates all selectors and actions for the Login page.
 * Tests never interact with selectors directly — only through this POM.
 */
export class LoginPage extends BasePage {
  // — Locators (strict, role-based selectors) —
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // — Actions —
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return this.errorMessage.innerText();
  }
}
