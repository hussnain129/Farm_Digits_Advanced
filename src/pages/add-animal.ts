import { Page, expect } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';
export class AddAnimalPage {
    private page: Page;
    private utils: CommonUtils;
    private addAnimalButton = 'text=Add Animal';
    private locationNameInput = "#name";
    private descriptionInput = "#description";
    private capacityInput = '#capacity';
    //private statusDropdown = 'select[name="status"]'
    private clickLocationBtn = "button:has-text('Add Location')";
    private cancelBtn = "button:has-text('Cancel')";
    constructor(page: Page) {
        this.page = page;
        this.utils = new CommonUtils(page);
    }
    async openAddAnimalForm() {
        //await this.utils.clickElement(this.addAnimalButton)
        await this.utils.clickElement(this.addAnimalButton);
      }
    async addShed(name: string, description: string, capacity: number) {
        await this.utils.fillInput(this.locationNameInput, name);
        await this.utils.fillInput(this.descriptionInput, description);
        await this.utils.fillInput(this.capacityInput, capacity);
        //await this.utils.selectOption(this.statusDropdown, status);
        await this.utils.clickElement(this.clickLocationBtn);
    }
    async verifyModalOpen() {
        await expect(this.page.getByText('Add Shed Location')).toBeVisible();
      }
}