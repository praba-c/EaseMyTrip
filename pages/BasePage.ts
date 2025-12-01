import { Locator, Page } from "@playwright/test";

export class BasePage {

    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async isPageDisplayed(locator: string) {
        await this.page.waitForSelector(locator);
        const visiblity = await this.page.locator(locator).isVisible();
        return visiblity;
    }

    async isDisplayed(element: Locator): Promise<any> {
        try {
            await element.waitFor({ state: 'visible', timeout: 2 });
            return true;
        } catch {
            return false;
        }
    }
}