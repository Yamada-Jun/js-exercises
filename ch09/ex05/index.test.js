import { instanceOf } from "./index.js"; // ts でも可

test("ch09_ex05", () => {
    class A { };
    class B extends A { };
    class C extends B { };
    class D { };
    const a = new A();
    const b = new B();
    const c = new C();
    const d = new D();
    expect(instanceOf(b, A)).toBe(true);
    expect(instanceOf(c, A)).toBe(true);//多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース
    expect(instanceOf(c, B)).toBe(true);
    //継承関係にないインスタンスとクラスのコンストラクタを入力するケース
    expect(instanceOf(d, A)).toBe(false);
    expect(instanceOf(d, B)).toBe(false);
    expect(instanceOf(d, C)).toBe(false);

});
