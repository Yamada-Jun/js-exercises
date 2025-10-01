
// 基本型値（string, number, boolean, null, object, array）に対応
export function stringifyJSON(json) {

    // nullへの対応
    if (json === null) {
        return "null";
    }
    // 型判定
    const type = typeof json;

    // string への対応
    if (type === "string") {
        // ダブルクォーテーションをエスケープに置き換え
        // テンプレートリテラルで置き換えた文字列をさらにダブルクォーテーションで囲む
        return `"${json.replace(/"/g, '\\"')}"`;
    }

    // number, boolean への対応
    if (type === "number" || type === "boolean") {
        // 数値や真偽値はそのまま文字列に変換
        return String(json);
    }

    // array への対応
    if (Array.isArray(json)) {
        // 各要素を再帰的に文字列化し、nullやundefinedの場合は"null"にする。それ以外はそのまま文字列化した値を使う
        const elements = json.map(elem => {
            const str = stringifyJSON(elem);
            return str === undefined ? "null" : str;
        });
        // 要素をカンマで結合し、[]で囲み配列の形式にする
        return `[${elements.join(",")}]`;
    }

    // object への対応
    if (type === "object") {
        // オブジェクトの各プロパティを処理
        const entries = [];
        for (const [key, val] of Object.entries(json)) {
            // 関数やundefinedは対応する必要がないためスキップ
            if (typeof val === "function" || val === undefined) continue;
            // キーと値をJSON形式で追加。valは再帰的に文字列化する
            entries.push(`"${key}":${stringifyJSON(val)}`);
        }
        // プロパティをカンマで結合し、{}で囲みオブジェクトの形式にする
        return `{${entries.join(",")}}`;
    }

    return undefined;
}
