import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

import { ContactPage } from "../pages/contactPage";
import { HomePage } from "../pages/HomePage";

let contactPage: ContactPage;
let homePage: HomePage;

test("Test case 1", async ({ page }) => {
  contactPage = new ContactPage(page);
  homePage = new HomePage(page);

  const randomFirstName: string = faker.person.firstName();

  await test.step("Go to Contact page", async () => {
    await homePage.goto();
    await homePage.clickContactLink();
  });

  await test.step("Click submit button", async () => {
    await contactPage.clickSubmitButton();
    await expect(contactPage.errorMessageText).toBeVisible();
    await expect(contactPage.forenameRequiredErrorText).toBeVisible();
    await expect(contactPage.emailRequiredErrorText).toBeVisible();
    await expect(contactPage.messageRequiredErrorText).toBeVisible();
  });

  await test.step("Populate mandatory fields", async () => {
    await contactPage.forenameInput.fill(randomFirstName);
    await contactPage.emailInput.fill(faker.internet.email());
    await contactPage.messageInput.fill(faker.word.words(10));
  });

  await test.step("Validate error is gone", async () => {
    await contactPage.clickSubmitButton();
    await expect(contactPage.errorMessageText).not.toBeVisible();
    await expect(contactPage.forenameRequiredErrorText).not.toBeVisible();
    await expect(contactPage.emailRequiredErrorText).not.toBeVisible();
    await expect(contactPage.messageRequiredErrorText).not.toBeVisible();

    await expect(contactPage.sendingFeedbackModal).toBeVisible();
    await contactPage.sendingFeedbackModal.waitFor({
      state: "hidden",
      timeout: 15000,
    });
    await expect(
      page.getByText(`Thanks ${randomFirstName}, we appreciate your feedback.`),
    ).toBeVisible();
  });
});
