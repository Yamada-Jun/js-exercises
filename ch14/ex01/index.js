export function unwritableAndUnconfigurableObj() {
    let o = {};
    Object.defineProperty(o, 'a', {
        value: 1,
        writable: false,
        enumerable: true,
        configurable: false
    });
    return o;
};
export function writableAndUnconfigurableObj() {
    let o = {};
    Object.defineProperty(o, 'b', {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: false
    });
    return o;
};
export function nestedUnwritableObj() {
    //入れ子になったオブジェクトをすべて凍結することで、入れ子になったすべてのプロパティを変更不可にする
    let o = Object.freeze({ c: Object.freeze({ d: Object.freeze({ e: 3 }) }) });
    return o;
};
