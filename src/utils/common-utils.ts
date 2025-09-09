import { Page, Locator, expect } from '@playwright/test';
import { Logger } from './logger';
export class CommonUtils {
  private page: Page;
  private logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger('CommonUtils');
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<Locator> {
    this.logger.logElementInteraction('waitForElement', selector);
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  async clickElement(selector: string, retries: number = 3): Promise<void> {
    this.logger.logElementInteraction('clickElement', selector);

    for (let i = 0; i < retries; i++) {
      try {
        const element = await this.waitForElement(selector);
        await element.click();
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        this.logger.warn(`Click attempt ${i + 1} failed, retrying...`, { selector, error });
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async fillInput(selector: string, value: string | number): Promise<void> {
    this.logger.logElementInteraction('fillInput', selector, value);
    const element = await this.waitForElement(selector);
    await element.fill(value.toString());
  }

  async typeText(selector: string, text: string, delay: number = 100): Promise<void> {
    this.logger.logElementInteraction('typeText', selector, text);
    const element = await this.waitForElement(selector);
    await element.type(text, { delay });
  }

  async selectOption(selector: string, value: string): Promise<void> {
    this.logger.logElementInteraction('selectOption', selector, value);
    const element = await this.waitForElement(selector);
    await element.selectOption(value);
  }

  async setCheckbox(selector: string, checked: boolean): Promise<void> {
    this.logger.logElementInteraction('setCheckbox', selector, checked.toString());
    const element = await this.waitForElement(selector);
    if (checked) {
      await element.check();
    } else {
      await element.uncheck();
    }
  }

  async getText(selector: string): Promise<string> {
    this.logger.logElementInteraction('getText', selector);
    const element = await this.waitForElement(selector);
    return await element.textContent() || '';
  }

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    this.logger.logElementInteraction('getAttribute', selector, attribute);
    const element = await this.waitForElement(selector);
    return await element.getAttribute(attribute);
  }

  async isElementVisible(selector: string): Promise<boolean> {
    this.logger.logElementInteraction('isElementVisible', selector);
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  async isElementPresent(selector: string): Promise<boolean> {
    this.logger.logElementInteraction('isElementPresent', selector);
    const element = this.page.locator(selector);
    return await element.count() > 0;
  }

  async waitForPageLoad(): Promise<void> {
    this.logger.logStep('Waiting for page to load');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForUrl(url: string, timeout: number = 10000): Promise<void> {
    this.logger.logStep(`Waiting for URL: ${url}`);
    await this.page.waitForURL(url, { timeout });
  }

  async takeScreenshot(name: string): Promise<void> {
    this.logger.logStep(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async scrollToElement(selector: string): Promise<void> {
    this.logger.logElementInteraction('scrollToElement', selector);
    const element = await this.waitForElement(selector);
    await element.scrollIntoViewIfNeeded();
  }

  async hoverOverElement(selector: string): Promise<void> {
    this.logger.logElementInteraction('hoverOverElement', selector);
    const element = await this.waitForElement(selector);
    await element.hover();
  }

  async rightClickElement(selector: string): Promise<void> {
    this.logger.logElementInteraction('rightClickElement', selector);
    const element = await this.waitForElement(selector);
    await element.click({ button: 'right' });
  }

  async doubleClickElement(selector: string): Promise<void> {
    this.logger.logElementInteraction('doubleClickElement', selector);
    const element = await this.waitForElement(selector);
    await element.dblclick();
  }

  async clearInput(selector: string): Promise<void> {
    this.logger.logElementInteraction('clearInput', selector);
    const element = await this.waitForElement(selector);
    await element.clear();
  }

  async waitForElementToDisappear(selector: string, timeout: number = 10000): Promise<void> {
    this.logger.logElementInteraction('waitForElementToDisappear', selector);
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'hidden', timeout });
  }

  async waitForElementCount(selector: string, count: number, timeout: number = 10000): Promise<void> {
    this.logger.logElementInteraction('waitForElementCount', selector, count.toString());
    await this.page.waitForFunction(
      (args: { selector: string; expectedCount: number }) => {
        return document.querySelectorAll(args.selector).length === args.expectedCount;
      },
      { selector, expectedCount: count },
      { timeout }
    );
  }

  async waitForText(selector: string, text: string, timeout: number = 10000): Promise<void> {
    this.logger.logElementInteraction('waitForText', selector, text);
    const element = await this.waitForElement(selector);
    await expect(element).toHaveText(text, { timeout });
  }

  async getAllElements(selector: string): Promise<Locator[]> {
    this.logger.logElementInteraction('getAllElements', selector);
    const elements = this.page.locator(selector);
    const count = await elements.count();
    return Array.from({ length: count }, (_, i) => elements.nth(i));
  }

  async getElementByIndex(selector: string, index: number): Promise<Locator> {
    this.logger.logElementInteraction('getElementByIndex', selector, index.toString());
    return this.page.locator(selector).nth(index);
  }

  async waitForNetworkIdle(): Promise<void> {
    this.logger.logStep('Waiting for network to be idle');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForRequest(urlPattern: string | RegExp, timeout: number = 10000): Promise<void> {
    this.logger.logStep(`Waiting for request: ${urlPattern}`);
    await this.page.waitForRequest(urlPattern, { timeout });
  }

  async waitForResponse(urlPattern: string | RegExp, timeout: number = 10000): Promise<void> {
    this.logger.logStep(`Waiting for response: ${urlPattern}`);
    await this.page.waitForResponse(urlPattern, { timeout });
  }

  async executeScript(script: string): Promise<any> {
    this.logger.logStep(`Executing script: ${script.substring(0, 50)}...`);
    return await this.page.evaluate(script);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async navigateTo(url: string): Promise<void> {
    this.logger.logStep(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async goBack(): Promise<void> {
    this.logger.logStep('Going back in browser history');
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  async goForward(): Promise<void> {
    this.logger.logStep('Going forward in browser history');
    await this.page.goForward();
    await this.waitForPageLoad();
  }

  async refreshPage(): Promise<void> {
    this.logger.logStep('Refreshing page');
    await this.page.reload();
    await this.waitForPageLoad();
  }

  async acceptAlert(): Promise<void> {
    this.logger.logStep('Accepting alert');
    this.page.on('dialog', dialog => dialog.accept());
  }

  async dismissAlert(): Promise<void> {
    this.logger.logStep('Dismissing alert');
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  async getAlertText(): Promise<string> {
    return new Promise((resolve) => {
      this.page.on('dialog', dialog => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
  }

  async switchToFrame(frameSelector: string): Promise<void> {
    this.logger.logStep(`Switching to frame: ${frameSelector}`);
    const frame = this.page.frameLocator(frameSelector);
  }

  async switchToMainContent(): Promise<void> {
    this.logger.logStep('Switching to main content');
  }

  async confirmAction(buttonText: string): Promise<void> {
    this.logger.logStep('confirmAction', buttonText);
    const confirmButton = this.page.getByRole('button', { name: buttonText });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();
  }

  async waitForTableUpdate(timeout: number = 500): Promise<void> {
    this.logger.logStep('waitForTableUpdate', `${timeout}ms`);
    await this.page.waitForTimeout(timeout);
  }

  getRowByName(name: string): Locator {
    this.logger.logStep('getRowByName', name);
    return this.page.locator('table tbody tr', { hasText: name });
  }
} 