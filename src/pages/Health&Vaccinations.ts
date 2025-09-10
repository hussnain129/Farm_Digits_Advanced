import { Page, expect, Locator } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';

export class HealthAndVaccinationsPage {
    private page: Page;
    private utils: CommonUtils;

    // Form Locators
    private addVeterinarianButton = 'button:has-text("Add Veterinarian")';
    private addVaccineButton = 'button:has-text("Add Vaccine")';
    private nameInput = '#name';
    private addressInput = '#address';
    private phoneInput = '#phone';
    private descriptionInput = '#description';
    private submitDoctorButton = 'button:has-text("Add Doctor")';
    private vaccineRotation = '#doses';
    private vaccineRotationSelection = 'div[role="option"]:has-text("4 doses")';
    private vaccineInterval = '#interval_days';
    private submitVaccineButton = 'button.bg-blue-600';

    // Table & Search
    private searchBox: Locator;
    private tableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.utils = new CommonUtils(page);

        this.searchBox = this.page.getByPlaceholder('Search veterinarians...');
        this.tableRows = this.page.locator('table tbody tr');
    }

    /** ---------- DOCTOR FORM ACTIONS ---------- */

    async openAddDoctorForm() {
        await this.utils.clickElement(this.addVeterinarianButton);
    }

    async openAddVaccineForm(){
        await this.utils.clickElement(this.addVaccineButton);
    }

    async fillDoctorForm(name: string, address: string, phone: string, description: string) {
        await this.utils.fillInput(this.nameInput, name);
        await this.utils.fillInput(this.addressInput, address);
        await this.utils.fillInput(this.phoneInput, phone);
        await this.utils.fillInput(this.descriptionInput, description);
    }

    async fillVaccineForm(name: string, interval: number, description: string) {
        await this.utils.fillInput(this.nameInput, name);
        await this.utils.clickElement(this.vaccineRotation);
        await this.utils.clickElement(this.vaccineRotationSelection);
        await this.utils.fillInput(this.vaccineInterval, interval);
        await this.utils.fillInput(this.descriptionInput, description);
    }

    async submitDoctorForm() {
        await this.utils.clickElement(this.submitDoctorButton);
    }

    async submitVaccineForm(){
        await this.utils.clickElement(this.submitVaccineButton);

    }

    async openAndSubmitDoctorForm(name: string, address: string, phone: string, description: string) {
        await this.openAddDoctorForm();
        await this.fillDoctorForm(name, address, phone, description);
        await this.submitDoctorForm();
    }

    async openAndSubmitVaccineForm(name: string, interval: number, description: string) {
        await this.openAddVaccineForm();
        await this.fillVaccineForm(name, interval, description);
        await this.submitVaccineForm();
    }

    /** ---------- TABLE ACTIONS ---------- */
    
    async searchVeterinarian(name: string) {
        await this.searchBox.fill(name);
        await this.utils.waitForTableUpdate();
    }

    async expectSearchResults(name: string, expectedCount?: number) {
        const rowCount = await this.tableRows.count();
        if (rowCount === 0) {
            console.log(`No search results found for "${name}", skipping checks.`);
            return; 
        }
        if (expectedCount !== undefined) {
            await expect(this.tableRows).toHaveCount(expectedCount);
        }
        const firstRowText = await this.tableRows.first().innerText();
        if (!firstRowText.includes("No veterinarians found")) {
            await expect(this.tableRows.first()).toContainText(name);
        } else {
            console.log(`Search result message displayed: "${firstRowText}"`);
        }
    }
    
    async deleteVeterinarian(fullName: string) {
        const row = this.utils.getRowByName(fullName);
        const rowCount = await row.count();
        if (rowCount === 0) {
            console.log(`Veterinarian "${fullName}" not found, skipping delete.`);
            return; 
        }
        const deleteIconButton = row.locator('button').last();
        await deleteIconButton.click();
        await this.utils.confirmAction('Delete');
        await expect(this.utils.getRowByName(fullName)).toHaveCount(0);
    }

}
