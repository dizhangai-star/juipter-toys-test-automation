import type { Locator, Page } from "@playwright/test";

export class ShopPage {
	readonly page: Page;
	readonly cartLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.cartLink = page.getByRole("link", { name: "Cart" });
	}

	async goto() {
		await this.page.goto("/#/shop");
	}

	product(name: string): Locator {
		return this.page.locator(".product").filter({ hasText: name });
	}

	async getProductPrice(name: string): Promise<number> {
		const priceText = await this.product(name)
			.locator(".product-price")
			.innerText();
		return Number(priceText.replace("$", ""));
	}

	async buyProduct(name: string, quantity: number) {
		const buyButton = this.product(name).getByRole("link", { name: "Buy" });
		for (let i = 0; i < quantity; i++) {
			await buyButton.click();
		}
	}

	async goToCart() {
		await this.cartLink.click();
	}
}
