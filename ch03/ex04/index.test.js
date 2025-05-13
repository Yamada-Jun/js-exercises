describe("問題3.4", () => {
    it("文字名 \"Hundred Points Symbol\" の絵文字表現 \"💯\" に対して length の値を確認する", () => {
        expect(2).toBe(("💯").length);
    });

    it("utf-16 コードポイント表現 \"\\uD83D\uDCAF\"、utf-32 コードポイント表現 \"\\u{0001F4AF }\" が絵文字と同値であること", () => {
        expect(("\uD83D\uDCAF").length).toBe(("\u{0001F4AF}").length);
    });
});
