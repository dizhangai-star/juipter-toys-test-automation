import type { Locator, Page } from "@playwright/test";

export class ContactPage {
	readonly page: Page;
	readonly submitButton: Locator;
	readonly errorMessageText: Locator;
	readonly forenameRequiredErrorText: Locator;
	readonly emailRequiredErrorText: Locator;
	readonly messageRequiredErrorText: Locator;
	readonly forenameInput: Locator;
	readonly emailInput: Locator;
	readonly messageInput: Locator;
	readonly sendingFeedbackModal: Locator;

	constructor(page: Page) {
		this.page = page;
		this.submitButton = page.getByRole("link", { name: "Submit" });
		this.errorMessageText = page.getByText(
			"but we won't get it unless you complete the form correctly.",
		);
		this.forenameRequiredErrorText = page.getByText("Forename is required");
		this.emailRequiredErrorText = page.getByText("Email is required");
		this.messageRequiredErrorText = page.getByText("Message is required");
		this.forenameInput = page.getByPlaceholder("John", { exact: true });
		this.emailInput = page.getByPlaceholder("john.example@planit.net.au");
		this.messageInput = page.getByPlaceholder("Tell us about it..");
		this.sendingFeedbackModal = page.locator(".modal");
	}

	async clickSubmitButton() {
		await this.submitButton.click();
	}
}
