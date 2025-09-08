import { Page } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';

export class LoginPage {
  private page: Page;
  private utils: CommonUtils;

  private loginClick = 'a[href="/login"]';
  private usernameInput = '#email';
  private passwordInput = '#password';
  private rememberMeCheckbox = '#remember';
  private loginButton = 'button:has-text("Sign in")';
  private errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
    this.utils = new CommonUtils(page);
  }

  async clickLoginButton(baseUrl: string, username: string, password: string) {
    // Ensure we are on the login page before interacting
    await this.utils.navigateTo(baseUrl);
    await this.utils.fillInput(this.usernameInput, username);
    await this.utils.fillInput(this.passwordInput, password);
    await this.utils.clickElement(this.rememberMeCheckbox);
    await this.utils.clickElement(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.utils.getText(this.errorMessage);
  }
} 