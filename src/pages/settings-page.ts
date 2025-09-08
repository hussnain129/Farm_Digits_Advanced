import { Page, expect } from "@playwright/test";
import { CommonUtils } from "../utils/common-utils";
import path from 'path';
export class SettingPage {
    private page: Page;
    private utils: CommonUtils;
    private waitingSelector = 'input[name="name"]';
    private uploadLogoSelector = 'input[name="logo_path"]';
    private saveButton = 'button:has-text("Save Settings")';
    constructor(page: Page) {
        this.page = page;
        this.utils = new CommonUtils(page);
    }
    async uploadLogoAndSave(filePath: string) {
        const resolvedPath = path.resolve(filePath);
        await this.page.setInputFiles(this.uploadLogoSelector, resolvedPath);
        await this.waitForData();
        await this.clickSaveButton();
    }
    async uploadLogo(filePath: string) {
        await this.page.setInputFiles(this.uploadLogoSelector, filePath);
    }
    async clickSaveButton() {
        await this.utils.clickElement(this.saveButton);
    }
    async waitForData() {
        await expect(this.page.locator(this.waitingSelector)).not.toHaveValue('');
    }
}