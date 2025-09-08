import { Page, expect } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';
export class AddDoctorPage {
    private page: Page;
    private utils: CommonUtils;
    private clciKAddDoctor = 'button:has-text("Add Veterinarian")';
    private nameInput = "#name";
    private addressInput = '#address'
    private phoneInput = '#phone';
    private descriptionInput = '#description'
    private clickAddDoctor = 'button:has-text("Add Doctor")'
    constructor(page: Page) {
        this.page = page;
        this.utils = new CommonUtils(page);
    }
    async openAddDoctorForm() {
        await this.utils.clickElement(this.clciKAddDoctor);
    }
    async addDoctor(name: string, address: string, phone: string, description: string) {
        await this.utils.fillInput(this.nameInput, name);
        await this.utils.fillInput(this.addressInput, address);
        await this.utils.fillInput(this.phoneInput, phone);
        await this.utils.fillInput(this.descriptionInput, description);
        await this.utils.clickElement(this.clickAddDoctor);
    }
    async openAndSubmitDoctorForm(name: string, address: string, phone: string, description: string) {
        await this.openAddDoctorForm();
        await this.addDoctor(name, address, phone, description);
    }

}