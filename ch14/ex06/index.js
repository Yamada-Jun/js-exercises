
const logs = [];//メソッド呼び出しのログを保存する配列
const handler = {
    //get(メソッド呼び出し)トラップを定義
    get(target, prop, receiver) {   //target: 元のオブジェクト、prop: プロパティ名、receiver: プロキシオブジェクト
        const orig_prop = target[prop];    //元のオブジェクトのプロパティを取得(proxy.f(1, 2)ならf)
        //呼び出したプロパティがメソッドであれば、ラップしてログを保存する関数を返す
        if (typeof orig_prop === 'function') {
            return function (...args) {//args: メソッドの引数(proxy.f(1, 2)なら[1, 2])
                //applyを使って元のメソッドを呼び出す
                const result = orig_prop.apply(this, args);
                //logs配列にログを追加
                logs.push({
                    name: prop,     //メソッド名
                    args: args,     //パラメータ(引数)
                    timestamp: new Date(),  //呼び出された時刻
                });
                return result;//元のメソッドの戻り値を返す
            };
        } else {
            //メソッドでなければ、そのまま元のプロパティを返す
            //Reflect.getを使って元のオブジェクトからプロパティを取得
            //これがないとgetが上書きされ、getでなくなってしまう
            return Reflect.get(target, prop, receiver);
        }
    },
}

export function makeProxyAndLogs(obj) { //任意のオブジェクトを引数に取る
    //そのオブジェクトの任意のメソッド呼び出しに対して、以下を持つオブジェクトを配列に追加して保存する Proxy を作成する
    const proxy = new Proxy(obj, handler);  //Proxyの第一引数にオブジェクト、第二引数にハンドラを指定
    //Proxy と 配列 双方への参照を返却する
    return [proxy, logs];
}


//const a = {
//    p: 1,
//    f: (x, y) => {
//        return x + y;
//    },
//};

//const [proxy, logs] = makeProxyAndLogs(a);

//console.log(logs); // []
//console.log(proxy.p); // 1
//console.log(proxy.f(1, 2)); // 3
//console.log(logs); // [{ name: "c", args: [1, 2], timestamp: ... }]
