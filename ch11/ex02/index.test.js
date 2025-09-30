import { cache } from './index.js';

test('最初の呼び出しでslowFnが1回呼ばれる', () => {
    const slowFn = jest.fn(obj => ({ result: obj.value * 2 }));
    const cachedSlowFn = cache(slowFn);

    const obj = { value: 5 };
    const result = cachedSlowFn(obj);

    expect(result.result).toBe(10);
    expect(slowFn).toHaveBeenCalledTimes(1);
});

test('同じオブジェクトで2回目の呼び出しはキャッシュされた結果を返す', () => {
    const slowFn = jest.fn(obj => ({ result: obj.value * 2 }));
    const cachedSlowFn = cache(slowFn);

    const obj = { value: 7 };
    const result1 = cachedSlowFn(obj);
    const result2 = cachedSlowFn(obj);

    expect(result1).toBe(result2);
    expect(slowFn).toHaveBeenCalledTimes(1);
});

test('同じ値でも異なるオブジェクトの場合はslowFnが再度呼ばれる', () => {
    const slowFn = jest.fn(obj => ({ result: obj.value * 2 }));
    const cachedSlowFn = cache(slowFn);

    const obj1 = { value: 10 };
    const obj2 = { value: 10 }; // 別のオブジェクト

    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);

    expect(result1).not.toBe(result2);
    expect(slowFn).toHaveBeenCalledTimes(2);
});
