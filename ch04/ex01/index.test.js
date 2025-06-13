import { add, sub, mul, div } from "./index.js";

test("ch04-ex01", () => {
    //add�̃e�X�g
    expect(add({ real: 0, imag: 0 }, { real: 0, imag: 0 })).toStrictEqual({ real: 0, imag: 0 });
    expect(add({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toStrictEqual({ real: 4, imag: 6 });
    expect(add({ real: -1, imag: -2 }, { real: -3, imag: -4 })).toStrictEqual({ real: -4, imag: -6 });
    expect(add({ real: 1, imag: -2 }, { real: -3, imag: 4 })).toStrictEqual({ real: -2, imag: 2 });
    //sub�̃e�X�g
    expect(sub({ real: 0, imag: 0 }, { real: 0, imag: 0 })).toStrictEqual({ real: 0, imag: 0 });
    expect(sub({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toStrictEqual({ real: -2, imag: -2 });
    expect(sub({ real: -1, imag: -2 }, { real: -3, imag: -4 })).toStrictEqual({ real: 2, imag: 2 });
    expect(sub({ real: 1, imag: -2 }, { real: -3, imag: 4 })).toStrictEqual({ real: 4, imag: -6 });
    //mul�̃e�X�g
    expect(mul({ real: 0, imag: 0 }, { real: 0, imag: 0 })).toStrictEqual({ real: 0, imag: 0 });
    expect(mul({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toStrictEqual({ real: -5, imag: 10 });
    expect(mul({ real: -1, imag: -2 }, { real: -3, imag: -4 })).toStrictEqual({ real: -5, imag: 10 });
    expect(mul({ real: 1, imag: -2 }, { real: -3, imag: 4 })).toStrictEqual({ real: 5, imag: 10 });
    //div�̃e�X�g
    expect(div({ real: 0, imag: 0 }, { real: 1, imag: 1 })).toStrictEqual({ real: 0, imag: 0 });
    expect(div({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toStrictEqual({ real: 0.44, imag: 0.08 });
    expect(div({ real: -1, imag: -2 }, { real: -3, imag: -4 })).toStrictEqual({ real: 0.44, imag: 0.08 });
    expect(div({ real: 1, imag: -2 }, { real: -3, imag: 4 })).toStrictEqual({ real: -0.44, imag: 0.08 });
});
