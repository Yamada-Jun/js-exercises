
//指数関数バックオフ(問題 11.16)
export function retryWithExponentialBackoff(func, max_retry, callback) {
    let count = 0;
    let delay = 0;
    // クロージャを使う
    const retryFunc = () => {
        //受け取った関数 func を呼び出し、func が true を返せばそこで終了する
        if (func()) {
            //func が true を返す際その結果(true)を引数として関数 callback が呼び出される
            callback(true);
        } else {
            //max_retry 回リトライしても成功しない場合はそこで終了する
            if (count < max_retry) {
                // 2のcount乗秒後に再試行
                delay = Math.pow(2, count) * 1000; // ミリ秒に変換
                count++;
                setTimeout(retryFunc, delay);
            } else {
                //max_retry 回のリトライが失敗し終了する際、その結果(false)を引数として関数 callback が呼び出される
                callback(false);
            }
        }
    };
    // 最初の試行を即座に開始
    retryFunc();
}


//指数関数バックオフ(Promise版)
export function retryWithExponentialBackoff_promise(func, max_retry) {
    let count = 0;
    // func_はPromiseを返すようにする
    function func_() {
        //受け取った関数 func を呼び出し、func が解決すればそこで終了する
        return func().then(
            // thenの第一引数:func()がresolveされた場合
            // 結果をそのまま返す（func の返り値が成功した場合は retryWithExponentialBackoff の返り値をその値で解決しなさい）
            (result) => result,
            // thenの第二引数:func()がrejectされた場合
            // リトライ時の仕様に従い再試行
            (err) => {
                if (count < max_retry) {
                    const delay = Math.pow(2, count) * 1000;
                    count++;
                    // delay後に再度func_()を呼び出し、その結果をresolve/rejectで返すPromiseを新しく作成
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            // delay秒後に再帰的にfunc_を呼び出す
                            func_().then(resolve, reject);
                        }, delay);
                    });
                } else {
                    //max_retry回リトライしても成功しない場合
                    //Promise.rejectを使って、失敗状態のPromiseを即座に生成しそのまま返す
                    return Promise.reject(err);
                }
            }
        );
    }
    //最後に上で定義したfunc_の実行、およびその結果をPromiseとして返す
    //呼び出し元はこのPromiseを受け取り、awaitなどで非同期的に処理の成功・失敗を待つことができる
    return func_();
}
