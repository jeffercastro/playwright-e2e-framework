import { Page, Locator } from '@playwright/test';

/**
 * BasePage: Shared utilities inherited by all Page Objects.
 * Centralizes common interactions to avoid duplication across pages.
 */
export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }
}
