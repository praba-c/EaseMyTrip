import { Page } from "playwright/test";
import { BasePage } from "./BasePage";
import hotelsListPageLocators from "../locator/hotelsListPageLocators.json";

export class HotelsListPage extends BasePage {

    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async isHotelsListPageDisplayed() {
        return this.isPageDisplayed(hotelsListPageLocators.searchBar.locator);
    }

    async selectHotel(key: string) {
        await this.page.locator(hotelsListPageLocators.popup.locator).click();
        const availableHotels = await this.page.locator(hotelsListPageLocators.hotelNamesList.locator).all();
        for (const hotels of availableHotels) {
            const hotelNames = await hotels.textContent() || '';
            if (hotelNames.toString().includes(key)) {
                await hotels.click();
                return;
            }
        }
        console.log('Cannot find hotels with the provided key!')
    }
}