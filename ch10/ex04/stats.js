//任意の関数を作成
export default function func_a(){
    console.log("func_a");
};

//任意のクラスを作成
class class_a {
    func() {
        console.log("class_a");
    }
}


export {
    class_a as class_aa
}