import { TypeMap } from "./index.js";

class Foo { }
let typeMap;
beforeEach(() => {
    typeMap = new TypeMap();
});
test("ch11_ex01", () => {
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Foo, new Foo());
    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Foo)).toBeInstanceOf(Foo);
});
