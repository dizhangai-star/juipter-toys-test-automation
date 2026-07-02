import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly homePageHeader: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageHeader = page.getByRole("heading", { name: "Jupiter Toys" });
    this.contactLink = page.getByRole("link", { name: "Contact" });
  }

  async goto() {
    await this.page.goto("/");
    await this.homePageHeader.waitFor();
  }

  async clickContactLink() {
    await this.contactLink.click();
  }
}
