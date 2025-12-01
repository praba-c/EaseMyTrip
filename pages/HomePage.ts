import { Page } from "@playwright/test";
import homePageLocs from "../locator/homePageLocators.json";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    page: Page;

    constructor(page: Page) {
        super(page)
        this.page = page;
    }

    async openApplication() {
        await this.page.goto('');
    }

    async isHomePageDisplayed() {
        return this.isPageDisplayed(homePageLocs.logo.locator);
    }

    async selectPlace(place: string) {
        const availablePlaces = await this.page.locator(homePageLocs.places.locator).all();
        for (const placesText of availablePlaces) {
            if (place === await placesText.textContent()) {
                await placesText.click();
                return;
            }
        }
        console.log("Place not available!")
    }
}