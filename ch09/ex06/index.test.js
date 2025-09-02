import { TypedMapCompo } from "./index.js";

describe("TypedMapCompo", () => {
    it("should create a TypedMapCompo with string keys and number values", () => {
        const map = new TypedMapCompo("string", "number", [["one", 1], ["two", 2]]);
        expect(map.size).toBe(2);
        expect(map.get("one")).toBe(1);
        expect(map.get("two")).toBe(2);
    });
    it("should throw TypeError for invalid initial entries", () => {
        expect(() => {
            new TypedMapCompo("string", "number", [["one", 1], [2, "two"]]);
        }).toThrow(TypeError);
    });
    it("should allow adding valid entries with set()", () => {
        const map = new TypedMapCompo("string", "number");
        map.set("three", 3);
        expect(map.size).toBe(1);
        expect(map.get("three")).toBe(3);
    });
    it("should throw TypeError for invalid key type in set()", () => {
        const map = new TypedMapCompo("string", "number");
        expect(() => {
            map.set(4, 4);
        }).toThrow(TypeError);
    });
    it("should throw TypeError for invalid value type in set()", () => {
        const map = new TypedMapCompo("string", "number");
        expect(() => {
            map.set("four", "four");
        }).toThrow(TypeError);
    });
});
