import { Page, expect } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';
export class AddShedPage {
    private page: Page;
    private utils: CommonUtils;
    private locationNameInput = "#name";
    private descriptionInput = "#description";
    private capacityInput = '#capacity';
    private clickLocationBtn = "button:has-text('Add Location')";
    constructor(page: Page) {
        this.page = page;
        this.utils = new CommonUtils(page);
    }
    async openAddShedForm() {
        await this.page.locator("span").filter({ hasText: 'Add Shed' }).waitFor({ state: 'visible' });
        await this.page.locator("span").filter({ hasText: 'Add Shed' }).click();
    }
    async addShed(name: string, description: string, capacity: number) {
        await this.utils.fillInput(this.locationNameInput, name);
        await this.utils.fillInput(this.descriptionInput, description);
        await this.utils.fillInput(this.capacityInput, capacity);
        await this.utils.clickElement(this.clickLocationBtn);
    }
    async openAndSubmitShedForm(name: string, description: string, capacity: number) {
        await this.openAddShedForm();
        await this.addShed(name, description, capacity);
    }

}