import { KanaClass } from './index.js';

describe("ch14_ex04", () => {
    const kana_e = new KanaClass("え", 0x3048);
    const kana_t = new KanaClass("と", 0x3068);
    const kana_r = new KanaClass("り", 0x308a);
    const kana_a = new KanaClass("あ", 0x3042);

    test("文字変換の確認", () => {
        expect(`${kana_a}`).toBe("あ");
        expect(String(kana_a)).toBe("あ");
    });

    test("数値変換の確認", () => {
        expect(+kana_a).toBe(0x3042);
        expect(Number(kana_a)).toBe(0x3042);
    });

    test("文字・数値どちらでもない場合の変換の確認", () => {
        expect(kana_a == "あ").toBe(true);
    });

    test("比較演算子の確認", () => {
        expect(kana_a < kana_e).toBe(true);
        expect(kana_e < kana_t).toBe(true);
        expect(kana_t < kana_r).toBe(true);
    });

    test("ソートの確認", () => {
        const kanaArray = [kana_e, kana_t, kana_r, kana_a];
        kanaArray.sort((x, y) => x - y);
        expect(kanaArray.map(k => k.kana)).toEqual(["あ", "え", "と", "り"]);
    });
});

