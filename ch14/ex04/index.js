export class KanaClass {
    kana;   //ひらがな
    utf16_code;//UTF-16コード単位

    //コンストラクタは引数でひらがなとUTF-16コード単位を受け取る仕様とする
    constructor(kana, code) {
        this.kana = kana;
        this.utf16_code = code;
    }

    [Symbol.toPrimitive](hint) {
        //hintがstring,number,defaultのどれかとなる
        if (hint === "string") {
            //console.log("string");
            //文字列が期待される場合にはひらがなを返す
            return this.kana;
        }
        else if (hint === "number") {
            //console.log("number");
            //数字が期待される場合には UTF-16 コード単位を返す
            return this.utf16_code;
        }
        else {
            //どちらでもない場合にはひらがなを返す
            //console.log("default");
            return this.kana;
        }
    }
}

//const kana_a = new KanaClass("あ", 0x3042);
//const kana_i = new KanaClass("い", 0x3044);
//console.log(kana_a);
//console.log(+kana_a);
//console.log(`${kana_a}`);
//console.log(Number(kana_a));
//console.log(String(kana_a));
//console.log(kana_a == 42);  //hint:default
//if (kana_a < kana_i) {
//    console.log(`${kana_a} < ${kana_i}`);
//} else {
//    console.log(`${kana_a} >= ${kana_i}`);
//}