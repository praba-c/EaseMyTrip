import { test, expect } from "@playwright/test";
import data from "../data/testData.json";
import { HomePage } from "../pages/HomePage";
import { HotelsListPage } from "../pages/HotelsListPage";
import { HotelPage } from "../pages/HotelPage";
import { HotelReviewPage } from "../pages/HotelReviewPage";
import { HotelPaymentPage } from "../pages/HotelPaymentPage";

test('Hotel Booking', async ({ browser }) => {

    const context = await browser.newContext({
        permissions: []
    });
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const hotelsListPage = new HotelsListPage(page);
    const hotelPage = new HotelPage(page);
    const hotelReviewPage = new HotelReviewPage(page);
    const hotelPaymentPage = new HotelPaymentPage(page);

    await homePage.openApplication();

    expect(await homePage.isHomePageDisplayed()).toBeTruthy();
    await homePage.selectPlace(data.homePage.place);

    expect(await hotelsListPage.isHotelsListPageDisplayed()).toBeTruthy();
    await hotelsListPage.selectHotel(data.hotelPage.key);

    expect(await hotelPage.isHotelPageDisplayed()).toBeTruthy();
    await hotelPage.selecCheckInAndCheckOut(data.hotelPage.dates.checkIn, data.hotelPage.dates.checkOut);
    await hotelPage.selectNumberOfRooms(data.hotelPage.count);
    await hotelPage.selectRoom();

    expect(await hotelReviewPage.isHotelReviewPageDisplayed()).toBeTruthy();
    await hotelReviewPage.fillGuestDetails(data.hotelReviewPage.guestDetails);
    await hotelReviewPage.applyPromoCodes();

    expect(await hotelPaymentPage.isPaymentPageDisplayed()).toBeTruthy();
    await hotelPaymentPage.fillUpiDetails(data.hotelPaymentPage.upiId, data.hotelPaymentPage.bank);
});