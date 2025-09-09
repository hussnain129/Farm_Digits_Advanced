import { Page, expect, Locator } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';

export class HealthAndVaccinationsPage {
  private page: Page;
  private utils: CommonUtils;

  // Form Locators
  private addVeterinarianButton = 'button:has-text("Add Veterinarian")';
  private nameInput = '#name';
  private addressInput = '#address';
  private phoneInput = '#phone';
  private descriptionInput = '#description';
  private submitDoctorButton = 'button:has-text("Add Doctor")';

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

  async fillDoctorForm(name: string, address: string, phone: string, description: string) {
    await this.utils.fillInput(this.nameInput, name);
    await this.utils.fillInput(this.addressInput, address);
    await this.utils.fillInput(this.phoneInput, phone);
    await this.utils.fillInput(this.descriptionInput, description);
  }

  async submitDoctorForm() {
    await this.utils.clickElement(this.submitDoctorButton);
  }

  async openAndSubmitDoctorForm(name: string, address: string, phone: string, description: string) {
    await this.openAddDoctorForm();
    await this.fillDoctorForm(name, address, phone, description);
    await this.submitDoctorForm();
  }

  /** ---------- TABLE ACTIONS ---------- */
  async searchVeterinarian(name: string) {
    await this.searchBox.fill(name);
    await this.utils.waitForTableUpdate();
  }

  async expectSearchResults(name: string, expectedCount?: number) {
    if (expectedCount) {
      await expect(this.tableRows).toHaveCount(expectedCount);
    }
    await expect(this.tableRows.first()).toContainText(name);
  }

  async deleteVeterinarian(fullName: string) {
    const row = this.utils.getRowByName(fullName);
    const deleteIconButton = row.locator('button').last();

    await deleteIconButton.click();

    // Handle modal confirmation
    await this.utils.confirmAction('Delete');

    // Verify removal
    await expect(this.utils.getRowByName(fullName)).toHaveCount(0);
  }

}
