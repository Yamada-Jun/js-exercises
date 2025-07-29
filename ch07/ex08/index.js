export function reverse(str) {
    let result = str;

    // Intl.Segmenter オブジェクトは、ロケールに応じたテキストのセグメンテーションを可能にし、文字列から意味のある項目（書記素、単語、文）を取得することができます。
    // graphemeは見た目上の1文字（書記素）単位で分割する。絵文字や結合文字も1文字として扱う
    let segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });

    // segmenterJa.segment(str)で意味のある項目のオブジェクトを作成し、オブジェクトからvalue.segmentでセグメントのみを取り出し、fromで配列にする
    let segments = Array.from(segmenterJa.segment(str), value => value.segment);
    // "abc123" => [ 'a', 'b', 'c', '1', '2', '3' ]
    //console.log(segments);

    // 配列を反転して空文字で結合する
    result = segments.reverse().join("");

    return result;
}