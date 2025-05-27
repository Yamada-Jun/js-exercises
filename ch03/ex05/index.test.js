import { exchangeLFtoCRLF } from "./index.js";
import { exchangeCRLFtoLF } from "./index.js";

describe("文字列中の改行コードを変換する", () => {
    it("文字列中の改行コードをLF→CR+LFに変換する", () => {
        const str1 = "Hello\nWorld";
        const str2 = "Hello\r\nWorld";
        expect(str2).toBe(exchangeLFtoCRLF(str1));
    });

    it("文字列中の改行コードをCR+LF→LFに変換する", () => {
        const str1 = "Hello\nWorld";
        const str2 = "Hello\r\nWorld";
        expect(str1).toBe(exchangeCRLFtoLF(str2));
    });
});
