import { expect, test } from "@playwright/test";

import { CartPage } from "../pages/cartPage";
import { ShopPage } from "../pages/shopPage";

let shopPage: ShopPage;
let cartPage: CartPage;

const products = [
	{ name: "Stuffed Frog", quantity: 2 },
	{ name: "Fluffy Bunny", quantity: 5 },
	{ name: "Valentine Bear", quantity: 3 },
];

test("Test case 3", async ({ page }) => {
	shopPage = new ShopPage(page);
	cartPage = new CartPage(page);

	const expectedPrices: Record<string, number> = {};

	await test.step("Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear", async () => {
		await shopPage.goto();
		for (const product of products) {
			expectedPrices[product.name] = await shopPage.getProductPrice(
				product.name,
			);
			await shopPage.buyProduct(product.name, product.quantity);
		}
	});

	await test.step("Go to the cart page", async () => {
		await shopPage.goToCart();
	});

	await test.step("Verify the price for each product", async () => {
		for (const product of products) {
			expect(await cartPage.getPrice(product.name)).toBe(
				expectedPrices[product.name],
			);
		}
	});

	await test.step("Verify the subtotal for each product is correct", async () => {
		for (const product of products) {
			const price = await cartPage.getPrice(product.name);
			expect(await cartPage.getSubtotal(product.name)).toBeCloseTo(
				price * product.quantity,
				2,
			);
		}
	});

	await test.step("Verify that total = sum(subtotals)", async () => {
		let sumOfSubtotals = 0;
		for (const product of products) {
			sumOfSubtotals += await cartPage.getSubtotal(product.name);
		}
		expect(await cartPage.getTotal()).toBeCloseTo(sumOfSubtotals, 2);
	});
});
