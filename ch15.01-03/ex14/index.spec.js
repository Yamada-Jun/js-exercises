import { expect, test } from "@playwright/test";

//ドロップダウンリストで選んだものだけが表示されることを確認するテスト
test.describe("ドロップダウンリストで選んだものだけが表示される", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/ch15.01-03/ex14/index.html");
    });
    test("「食品」でお菓子が出る", async ({ page }) => {
        await page.getByRole("combobox").selectOption("食品");
        const items = page.getByRole("productList");
        const count = await items.count();
        for (let i = 0; i < count; i++) {
            const text = await items.nth(i).innerText();
            expect(["お菓子"]).toContain(text);
        }
    });
    test("「文房具」で消しゴムとものさしが出る", async ({ page }) => {
        await page.getByRole("combobox").selectOption("食品");
        const items = page.getByRole("productList");
        const count = await items.count();
        for (let i = 0; i < count; i++) {
            const text = await items.nth(i).innerText();
            expect(["消しゴム", "ものさし"]).toContain(text);
        }
    });
});