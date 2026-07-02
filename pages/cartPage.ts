import type { Locator, Page } from "@playwright/test";

export class CartPage {
	readonly page: Page;
	readonly total: Locator;

	constructor(page: Page) {
		this.page = page;
		this.total = page.locator(".total");
	}

	row(name: string): Locator {
		return this.page.locator(".cart-item").filter({ hasText: name });
	}

	async getPrice(name: string): Promise<number> {
		const priceText = await this.row(name).locator("td").nth(1).innerText();
		return Number(priceText.replace("$", ""));
	}

	async getSubtotal(name: string): Promise<number> {
		const subtotalText = await this.row(name).locator("td").nth(3).innerText();
		return Number(subtotalText.replace("$", ""));
	}

	async getTotal(): Promise<number> {
		const totalText = await this.total.innerText();
		return Number(totalText.replace("Total:", "").trim());
	}
}
