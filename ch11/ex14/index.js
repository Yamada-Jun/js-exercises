export function sortJapanese(ary) {
    // sortに比較関数を渡してソート
    // localeCompareを'ja' を指定して日本語の文字列として比較
    // sensitivity: 'base' を指定することで、「ひらがな」と「カタカナ」、「濁点・半濁点」、「大文字・小文字」などの違いを無視して比較
    return ary.slice().sort((a, b) => a.localeCompare(b, 'ja', { sensitivity: 'base' }));
}

export function toJapaneseDateString(date) {
    // Intl.DateTimeFormatを使って和暦に変換
    const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
        era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formatter.format(date);
}
