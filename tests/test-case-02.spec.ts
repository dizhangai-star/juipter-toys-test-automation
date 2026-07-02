import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

import { ContactPage } from "../pages/contactPage";
import { HomePage } from "../pages/homePage";

let contactPage: ContactPage;
let homePage: HomePage;

for (let run = 1; run <= 5; run++) {
	test(`Test case 2 - run ${run}`, async ({ page }) => {
		contactPage = new ContactPage(page);
		homePage = new HomePage(page);

		const randomFirstName: string = faker.person.firstName();

		await test.step("Go to Contact page", async () => {
			await homePage.goto();
			await homePage.clickContactLink();
		});

		await test.step("Populate mandatory fields", async () => {
			await contactPage.forenameInput.fill(randomFirstName);
			await contactPage.emailInput.fill(faker.internet.email());
			await contactPage.messageInput.fill(faker.word.words(10));
		});

		await test.step("Click submit button", async () => {
			await contactPage.clickSubmitButton();
		});

		await test.step("Validate successful submission message", async () => {
			await expect(contactPage.sendingFeedbackModal).toBeVisible();
			await expect(
				contactPage.sendingFeedbackModal.getByText("Sending Feedback"),
			).toBeVisible();
			await contactPage.sendingFeedbackModal.waitFor({
				state: "hidden",
				timeout: 30000,
			});
			await expect(
				page.getByText(
					`Thanks ${randomFirstName}, we appreciate your feedback.`,
				),
			).toBeVisible();
		});
	});
}
