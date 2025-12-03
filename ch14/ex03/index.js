export class IgnoreAccentPattern {
    constructor(glob) {
        //文字列が渡された場合
        if (typeof glob === "string") {
            //normalize("NFD")で分解してから、正規表現/[\u0300-\u036f]/gでダイアクリティカルマークを削除
            this.source = glob.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        } else if (glob instanceof RegExp) {
            //正規表現(/Cafe/とか)が渡された場合
            this.flags = glob.flags;//フラグを保存,これがないとフラグ情報が失われる
            //normalize("NFD")で分解してから、正規表現/[\u0300-\u036f]/gでダイアクリティカルマークを削除
            const source = glob.source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            //保存したフラグと加工したソースをプロパティに設定,これは後で新しいRegExpオブジェクトを作るときに使う
            this.source = source;
        } else {
            throw new TypeError("文字列かRegExpにしてください");
        }
    }

    //ウェルノウンシンボルを使って、searchメソッドとmatchメソッドをオーバーライド
    [Symbol.search](s) {
        //文字列sを正規化して、ダイアクリティカルマークを削除
        let str = s.normalize("NFD");
        str = str.replace(/[\u0300-\u036f]/g, "");
        //新しいRegExpオブジェクト(sourceとflagsを使って)を作成して、searchメソッドを呼び出す
        const regexp = new RegExp(this.source, this.flags);
        return str.search(regexp);
    }

    [Symbol.match](s) {
        let str = s.normalize("NFD");
        str = str.replace(/[\u0300-\u036f]/g, "");
        //新しいRegExpオブジェクト(sourceとflagsを使って)を作成して、matchメソッドを呼び出す
        const regexp = new RegExp(this.source, this.flags);
        return str.match(regexp);
    }

};

