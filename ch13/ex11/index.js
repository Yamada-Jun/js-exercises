
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



export function retryWithExponentialBackoff_promise(func, max_retry) {
    let count = 0;

    function func_() {
        return func().then(
            result => result,
            err => {
                if (count < max_retry) {
                    const delay = Math.pow(2, count) * 1000;
                    count++;
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            func_().then(resolve, reject);
                        }, delay);
                    });
                } else {
                    return Promise.reject(err);
                }
            }
        );
    }

    return func_();
}
