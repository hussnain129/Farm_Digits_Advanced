import { Page } from '@playwright/test';
import { CommonUtils } from '../utils/common-utils';
export class SidebarPage {
    private page: Page;
    private utils: CommonUtils;
    private LivestockManagement = '//span[text()="Livestock Management"]';
    private Animals = '//div[text()="Animals"]';
    private ShedTab = 'button[role="tab"]:has-text("Sheds")';
    private AnimalTab = 'button[role="tab"]:has-text("Animals")';
    private settingsLink = 'button:has-text("Settings")';
    private generalSettingsLink = '//div[@class="text-[13px]" and normalize-space()="General Settings"]';
    constructor(page: Page) {
        this.page = page;
        this.utils = new CommonUtils(page);
    }
    async clickLivestockManagement() {
        await this.utils.clickElement(this.LivestockManagement);
    }
    async clickAnimals() {
        await this.utils.clickElement(this.Animals);
    }
    async clickShed() {
        await this.utils.clickElement(this.ShedTab);
    }
    async clickAnimalTab(){
        await this.utils.clickElement(this.AnimalTab)
    }
    async clickSettings() {
        await this.utils.clickElement(this.settingsLink);
    }
    async clickGeneralSettings() {
        await this.utils.clickElement(this.generalSettingsLink);

    }  
    async openGeneralSettings() {
        await this.clickSettings();
        await this.clickGeneralSettings();
      }
      async openAnimalTable(){
        await this.clickLivestockManagement();
        await this.clickAnimals();
        await this.clickAnimalTab();
      }
      async openShedTable(){
        await this.clickLivestockManagement();
        await this.clickAnimals();
        await this.clickShed();
      }
}