export class MyArrayLike {
    //Array.prototype.mapは新しい配列を作る際に「元の配列の長さ」と同じ長さで新しいインスタンスを生成
    constructor(length) {
        this.length = length;
        //インデックス付きプロパティを初期化
        //mapはコールバック関数を適用した結果をインデックス付きプロパティに順番に代入することができる
        for (let i = 0; i < length; i++) {
            this[i] = undefined;
        }
    }
}

export class MyArray extends Array {
    constructor(items) {
        super(...items);
    }

    // TODO
    //Symbol.speciesは派生オブジェクトを生成する際にどのコンストラクタを使うかを指定する
    //mapやsliceは新しい配列を返すが、その時に使用するコンストラクタをMyArrayLikeに指定する
    static get [Symbol.species](){
        return MyArrayLike;
    }
}


//const array = new MyArray([1, 2, 3, 4, 5]);
//const result = array.map((x) => x * x);
//console.log(result)


//const array_ = new MyArray(["A", "B", "C", "D"]);
//const result_ = array_.slice(1, 3);
//console.log(result_)