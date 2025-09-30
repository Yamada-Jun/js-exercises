export function modifyUrl({ base, addQuery = [], path }) {
    // URLオブジェクトを使ってURLを操作するために、baseをもとにURLオブジェクトを作成
    const url = new URL(base);
    // pathが指定されていれば、URLオブジェクトのpathnameを更新
    if (path) {
        url.pathname = new URL(path, url).pathname;
    }
    // query配列の各要素をURLオブジェクトのsearchParamsに追加
    for (const [key, value] of addQuery) {
        url.searchParams.append(key, value);
    }
    // 文字列を返す
    return url.toString();
}
