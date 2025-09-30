//任意の関数を作成
export default function func_b(){
    console.log("func_a");
};

//任意のクラスを作成
class class_b {
    func() {
        console.log("class_a");
    }
}


export {
    class_b as class_aa
}