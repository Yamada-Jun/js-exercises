import { makeProxyAndLogs } from './index.js';

describe("ch14_ex06", () => {
    test("logs method calls on proxy object", () => {
        const a = {
            p: 1,
            f: (x, y) => {
                return x + y;
            },
        };
        const [proxy, logs] = makeProxyAndLogs(a);
        expect(logs).toEqual([]);
        expect(proxy.p).toBe(1);
        expect(proxy.f(1, 2)).toBe(3);
        expect(logs.length).toBe(1);
        expect(logs[0].name).toBe("f");
        expect(logs[0].args).toEqual([1, 2]);
        expect(logs[0].timestamp).toBeInstanceOf(Date);
    })
});

