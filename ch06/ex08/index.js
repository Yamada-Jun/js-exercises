
export function restrict(target, template) {
    let result = Object(target);
    for (let key of Object.keys(result)) {
        if (!(key in template)) {
            delete result[key];
        }
        // 継承プロパティがテンプレートオブジェクトに存在していて、削除先オブジェクトが独自プロパティで同名をもつ場合削除
        else if (Object.getPrototypeOf(template)[key] !== undefined && !(key in Object.getPrototypeOf(result))) {
            delete result[key];
        }
    }
    return result;
}


export function substract(target, ...sources) {
    let result = Object(target);
    for (let source of sources) {
        for (let key of Object.keys(source)) {
            if (key in result) {
                delete result[key];
            }
        }
    }
    return result;
}
