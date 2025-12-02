import { expect, test } from "@playwright/test";

test('integrity属性が正しい場合', async ({ page }) => {
    await page.goto('/ch15.01-03/ex03/index.html');
    // success.jsが実行されるとwindow.successLoadedがtrueになる
    const result = await page.evaluate(() => window.successLoaded);
    expect(result).toBe(true);
});

test('integrity属性が正しくない場合', async ({ page }) => {
    await page.goto('/ch15.01-03/ex03/index_fail.html');
    // success.jsが実行されるとwindow.successLoadedがtrueにならない
    const result = await page.evaluate(() => window.successLoaded);
    expect(result).toBe(undefined);
});
