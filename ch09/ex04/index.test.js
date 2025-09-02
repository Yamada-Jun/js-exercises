import { SoldierClass, MagicSoldierClass, SoldierP, MagicSoldierP } from "./index.js"; // ts でも可

test("ch09_ex04", () => {
    // class
    const soldier_class = new SoldierClass(10);
    expect(soldier_class.attack()).toBe(20);
    const magicsoldier_class = new MagicSoldierClass(10, 6);
    expect(magicsoldier_class.attack()).toBe(16);
    expect(() => new SoldierClass(-1)).toThrow("require : x > 0");
    expect(() => new MagicSoldierClass(10, -1)).toThrow("require : x > 0");

    // prototype
    const soldier_p = new SoldierP(10);
    expect(soldier_p.attack()).toBe(20);
    const magicsoldier_p = new MagicSoldierP(10, 6);
    expect(magicsoldier_p.attack()).toBe(16);
    expect(() => new SoldierP(-1)).toThrow("require : x > 0");
    expect(() => new MagicSoldierP(10, -1)).toThrow("require : x > 0");

});
