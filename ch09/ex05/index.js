
export function instanceOf(object, constructor) {
    let proto = Object.getPrototypeOf(object);
    while (proto !== null) {                    // protoがnullになるまで繰り返す
        if (proto === constructor.prototype) {  // prototypeが一致したらtrueを返す
            return true;
        }
        proto = Object.getPrototypeOf(proto);   // 次のプロトタイプを取得
    }
    return false;
}