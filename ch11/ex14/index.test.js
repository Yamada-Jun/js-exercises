import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("ch11_ex14", () => {
    test("sortJapanese", () => {
        const input = ["つつ", "っき", "ば", "うえ", "あい", "づづ", "は"];
        const expected = ["あい", "うえ", "っき", "つつ", "づづ", "ば", "は"];
        expect(sortJapanese(input)).toEqual(expected);
    }
    );
    test("toJapaneseDateString", () => {
        expect(toJapaneseDateString(new Date(2024, 4 - 1, 2))).toBe("令和6年4月2日");
        expect(toJapaneseDateString(new Date(2019, 5 - 1, 1))).toBe("令和元年5月1日");
        expect(toJapaneseDateString(new Date(1989, 1 - 1, 8))).toBe("平成元年1月8日");
        expect(toJapaneseDateString(new Date(1926, 12 - 1, 25))).toBe("昭和元年12月25日");
        expect(toJapaneseDateString(new Date(1912, 7 - 1, 30))).toBe("大正元年7月30日");
        expect(toJapaneseDateString(new Date(1868, 9 - 1, 8))).toBe("明治元年9月8日");
    }
    );
}
);