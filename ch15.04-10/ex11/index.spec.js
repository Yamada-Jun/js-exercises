import { test, expect } from "@playwright/test";

test.describe("ch15.04-10/ex11", () => {
	test("ハッシュ切り替え表示テスト", async ({ page }) => {
		await page.goto("/ch15.04-10/ex11/index.html");
		const newTodoInput = page.locator("#new-todo");
		const newTodoForm = page.locator("#new-todo-form");
		// Todoを3つ追加
		await newTodoInput.fill("質問表に質問を記載する");
		await newTodoForm.dispatchEvent("submit");
		await newTodoInput.fill("練習問題を完了する");
		await newTodoForm.dispatchEvent("submit");
		await newTodoInput.fill("交通費精算");
		await newTodoForm.dispatchEvent("submit");
		// 2番目のTodoを完了にする
		const todoItems = page.locator("#todo-list li");
		const secondTodoToggle = todoItems.nth(1).locator("input.toggle");
		await secondTodoToggle.check();

		// ハッシュを#/activeに変更
		await page.evaluate(() => {
			location.hash = "#/active";
		});
		// 表示されているTodoがアクティブなものだけであることを確認
        await expect(page.locator("#todo-list li")).toHaveCount(2);//表示されるTodoは2つ
		const visibleTodos1 = await page.locator("#todo-list li").allInnerTexts();//allInnerTexts()でリストのテキストを取得
        // 空白と❌を除去して比較
		expect(visibleTodos1.map(t => t.trim().replace(/\s*❌\s*$/, ""))).toEqual(["質問表に質問を記載する", "交通費精算"]);

		// ハッシュを#/completedに変更
		await page.evaluate(() => {
			location.hash = "#/completed";
		});
		await expect(page.locator("#todo-list li")).toHaveCount(1);//表示されるTodoは1つ
		const visibleTodos2 = await page.locator("#todo-list li").allInnerTexts();//allInnerTexts()でリストのテキストを取得
		// 空白と❌を除去して比較
		expect(visibleTodos2.map(t => t.trim().replace(/\s*❌\s*$/, ""))).toEqual(["練習問題を完了する"]);

		// ハッシュを#/allに変更
		await page.evaluate(() => {
			location.hash = "#/all";
		});
		await expect(page.locator("#todo-list li")).toHaveCount(3);//表示されるTodoは3つ
		const visibleTodos3 = await page.locator("#todo-list li").allInnerTexts();//allInnerTexts()でリストのテキストを取得
		// 空白と❌を除去して比較
		expect(visibleTodos3.map(t => t.trim().replace(/\s*❌\s*$/, ""))).toEqual(["質問表に質問を記載する", "練習問題を完了する", "交通費精算"]);
	});
});
