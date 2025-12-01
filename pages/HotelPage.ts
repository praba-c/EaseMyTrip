import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import hotelPageLocators from "../locator/hotelPageLocators.json"

export class HotelPage extends BasePage {

    page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async isHotelPageDisplayed() {
        return this.isPageDisplayed(hotelPageLocators.monthsNextBtn.locator);
    }

    async selecCheckInAndCheckOut(checkIn: string, checkOut: string) {
        const checkInDate = checkIn.split('-');
        const checkOutDate = checkOut.split('-');

        await this.selectDate(checkInDate);
        await this.selectDate(checkOutDate);
    }

    async selectNumberOfRooms(count: string) {
        const defaultCount = await this.page.locator(hotelPageLocators.adultCount.locator).textContent();
        if (defaultCount === count) {
            await this.page.locator(hotelPageLocators.roomsDoneBtn.locator).click();
            return;
        }
        if (Number(count) < Number(defaultCount)) {
            while (true) {
                await this.page.locator(hotelPageLocators.adultCountMinusBtn.locator).click();
                if (await this.page.locator(hotelPageLocators.adultCount.locator).textContent() === count) {
                    await this.page.locator(hotelPageLocators.roomsDoneBtn.locator).click();
                    return;
                }
            }
        }
        while (true) {
            await this.page.locator(hotelPageLocators.adultCountPlusBtn.locator).click();
            if (await this.page.locator(hotelPageLocators.adultCount.locator).textContent() === count) {
                await this.page.locator(hotelPageLocators.roomsDoneBtn.locator).click();
                return;
            }
        }
    }

    async selectRoom() {
        await this.page.locator(hotelPageLocators.bookNowBtn.locator).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(hotelPageLocators.bookNowBtn.locator).click();
    }

    async selectDate(inputDate: string[]) {
        let condition = true;
        while (condition) {
            const maonthNames = await this.page.locator(hotelPageLocators.monthsNameList.locator).all();
            for (const monthName of maonthNames) {
                const month = await monthName.textContent() || '';
                if (month.toString().includes(inputDate[1])) {
                    const dates = await this.page.locator(`//span[text()='${month}']/ancestor::div[3]` +
                        hotelPageLocators.datesList.locator).all();
                    for (const date of dates) {
                        const dateText = await date.textContent() || '';
                        if (dateText === inputDate[0]) {
                            await date.click();
                            break;
                        }
                    }
                    condition = false;
                    break;
                }
            }
            if (condition) await this.page.locator(hotelPageLocators.monthsNextBtn.locator).click();
        }
    }
}