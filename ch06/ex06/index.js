

// 1.オブジェクトのすべての独自プロパティ（列挙不可、プロパティ名が Symbol のものを含む） のプロパティ名の配列 =>getOwnPropertyNames
// 2.列挙可能な継承プロパティのプロパティ名の配列 =>for/in ループ(※独自プロパティは除く必要あり)

export function f(obj) {
    let array = [];
    // getOwnPropertyNamesで独自の列挙可/不可プロパティを取得する
    array = Object.getOwnPropertyNames(obj);

    // for/in ループで列挙可の独自/継承プロパティを取得する
    for (let p in obj) {
        // 列挙可の独自プロパティはgetOwnPropertyNamesで取得済みなので、それ以外を取得する
        if (!obj.hasOwnProperty(p)) {
            array.push(p);
        }
    }

    return array;
}

