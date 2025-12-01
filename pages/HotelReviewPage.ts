import { Page } from "@playwright/test"
import { BasePage } from "./BasePage";
import { allure } from "allure-playwright";
import hotelReviewPageLocators from "../locator/hotelReviewPageLocators.json";

export class HotelReviewPage extends BasePage {

    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async isHotelReviewPageDisplayed() {
        return this.isPageDisplayed(hotelReviewPageLocators.hotelDetails.locator);
    }

    async fillGuestDetails(guestDetails: { firstName: string, lastName: string, email: string, mobile: string }) {
        await this.page.locator(hotelReviewPageLocators.firstNameInputField.locator).first().fill(guestDetails.firstName);
        await this.page.locator(hotelReviewPageLocators.lastNameInputField.locator).last().fill(guestDetails.lastName);
        await this.page.locator(hotelReviewPageLocators.emailInputField.locator).fill(guestDetails.email);
        await this.page.locator(hotelReviewPageLocators.mobileInputField.locator).fill(guestDetails.mobile);
    }

    async applyPromoCodes() {
        const codesList = await this.page.locator(hotelReviewPageLocators.promoCodes.locator).allTextContents();
        for (const code of codesList) {
            await this.page.locator(hotelReviewPageLocators.promoCodes.locator + `[text()='${code}']`).click();
            if (await this.page.locator(hotelReviewPageLocators.closeBtn.locator).isVisible({ timeout: 1 })) {
                await this.page.locator(hotelReviewPageLocators.closeBtn.locator).click();
            }
            await this.page.waitForTimeout(1000);
            const currentPrice = await this.page.locator(hotelReviewPageLocators.totalPrice.locator).textContent();
            allure.attachment('Price details', await this.page.screenshot({ fullPage: true }), 'image/png')
        }
        await this.page.locator(hotelReviewPageLocators.continueBookingBtn.locator).click();
    }
}