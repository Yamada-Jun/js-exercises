// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
    // この関数をWeakMapで実装する
    const map = new WeakMap();
    return (obj) => {
        if (map.has(obj)) {
            return map.get(obj);
        } else {
            const result = f(obj);
            map.set(obj, result);
            return result;
        }
    };

}

function slowFn(obj) {
    // 時間のかかる処理
    const end = Date.now() + 1000; // 1秒待つ
    while (Date.now() < end);

    return obj;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
