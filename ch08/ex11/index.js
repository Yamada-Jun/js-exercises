
let ojb = {
    a: 1, b: 2, c: 3,
    //fnという関数を作成
    fn: function(x, y, z) {
        return this.a + this.b + this.c + x + y + z;
    }
};


console.log(ojb.fn.toString());

//toStringメソッドで組み込み関数を呼び出した場合
console.log(Math.max.toString());