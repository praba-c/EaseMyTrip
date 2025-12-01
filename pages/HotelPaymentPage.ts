import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import hotelPaymentPageLocators from "../locator/hotelPaymentPage.json";

export class HotelPaymentPage extends BasePage {

    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async isPaymentPageDisplayed() {
        return this.isPageDisplayed(hotelPaymentPageLocators.upiInputField.locator);
    }

    async fillUpiDetails(upiId: string, bank: string) {
        await this.page.locator(hotelPaymentPageLocators.upiInputField.locator).fill(upiId);
        await this.page.selectOption(hotelPaymentPageLocators.bankOptions.locator, { value: bank });
        await this.page.locator(hotelPaymentPageLocators.verifyAndPayBtn.locator).click();
        await this.page.locator(hotelPaymentPageLocators.radioBtn.locator).click();
        await this.page.locator(hotelPaymentPageLocators.continueBtn.locator).click();
    }
}