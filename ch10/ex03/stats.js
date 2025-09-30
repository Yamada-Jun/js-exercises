//任意の関数を作成
const func_b = () => {
    console.log("func_a");
};

//任意のクラスを作成
class class_a {
    func() {
        console.log("class_a");
    }
}

//Nodeのモジュール方式でエクスポート
module.exports = { func_b, class_a }