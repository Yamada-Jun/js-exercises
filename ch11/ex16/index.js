export function retryWithExponentialBackoff(func, maxRetry, callback)
{
    let count = 0;
    let delay = 0;
    // クロージャを使う
    const retryFunc = () => {
        //受け取った関数 func を呼び出し、func が true を返せばそこで終了する
        if (func()) {
            //func が true を返す際その結果(true)を引数として関数 callback が呼び出される
            callback(true);
        } else {
            //maxRetry 回リトライしても成功しない場合はそこで終了する
            if (count < maxRetry) {
                // 2のcount乗秒後に再試行
                delay = Math.pow(2, count) * 1000; // ミリ秒に変換
                count++;
                setTimeout(retryFunc, delay);
            } else {
                //maxRetry 回のリトライが失敗し終了する際、その結果(false)を引数として関数 callback が呼び出される
                callback(false);
            }
        }
    };
    // 最初の試行を即座に開始
    retryFunc();
}
