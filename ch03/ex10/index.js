//同じ文字列から生成された 2 個の Symbol 変数を作成
let symname1 = Symbol("propname");
let symname2 = Symbol("propname");

//それらをプロパティとして持つオブジェクトを作成
let obj = {};
obj[symname1] = "value1";
obj[symname2] = "value2";

//作成したSymbol変数を使って各プロパティの値を取得
console.log(obj[symname1]); // => value1
console.log(obj[symname2]); // => value2

//同じ文字列から生成された 2 個の Symbol 変数を作成(Symbol.for()で同名の変数を作成した場合)
let symname1_for = Symbol.for("propname_for");
let symname2_for = Symbol.for("propname_for");

//それらをプロパティとして持つオブジェクトを作成(Symbol.for()で同名の変数を作成した場合)
let obj_for = {};
obj_for[symname1_for] = "value1";
obj_for[symname2_for] = "value2";   //ここで上書きされる

//作成したSymbol変数を使って各プロパティの値を取得(Symbol.for()で同名の変数を作成した場合)
console.log(obj_for[symname1_for]); // => value2
console.log(obj_for[symname2_for]); // => value2