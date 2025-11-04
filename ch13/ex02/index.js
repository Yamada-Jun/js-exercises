/**
 * 指定された時間後に解決される Promise を返す
 * @param  {number}   msec    - 返り値の Promise を解決するまで待つ時間 (ミリ秒)
 * @return {Promise}  Promise - 指定時間後に解決される Promise
 */
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

// 例: 1秒後に "A" と出力し、その2秒後に "B" と出力し、その3秒後に "C" と出力する
//wait(1000)
//    .then(() => console.log("A"))
//    .then(() => wait(2000))
//    .then(() => console.log("B"))
//    .then(() => wait(3000))
//    .then(() => console.log("C"));

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
    throw new Error("X");
};
const errY = () => {
    throw new Error("Y");
};

//function f1() {
//    // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
//    //
//    // 回答:
//    // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
//    //
//    // 説明:
//    // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
//    //
//    // 図解:
//    //  wait3
//    // |---------------|
//    //                  logA
//    //                 |-|
//    //                    wait2
//    //                   |----------|
//    //                               logB
//    //                              |-|
//    //                                 wait1
//    //                                |-----|
//    //                                       logC
//    //                                      |-|
//    wait3()
//        .then(logA)
//        .then(() => wait2().then(logB))
//        .then(() => wait1().then(logC));
//}

function f2() {
    // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
    //
    // 解答例:
    // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
    // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
    // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
    //
    // 図解:
    //  wait3
    // |---------------|
    //                  logA
    //                 |-|
    //                    wait2
    //                   |----------|
    //                               logB
    //                              |-|
    //                  wait1
    //                 |-----|
    //                        logC
    //                       |-|
    wait3()
        .then(logA)
        .then(() => {
            wait2().then(logB);
        })
        .then(() => wait1().then(logC));
}


function f3() {
    // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
    try {
        wait(0).then(logA).then(errX);
    } catch (e) {
        logB();
    } finally {
        logC();
    }
}

//f3();
//予想：A,B,Cの順番に出力される

function f4() {
    // NOTE: f5 との比較用
    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then((value) =>
            wait(1000).then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}

//f4();
//予想:2秒後にAが出力され、1秒後にBと100が出力される
//結果:予想通り

function f5() {
    // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
    wait2()
        .then(() => {
            logA();
            return 40;
        })
        .then(
            wait1().then(() => {
                logB();
                return 100;
            })
        )
        .then((v) => log(v));
}


//f5();
//予想:2秒後にAとundefinedが出力される。2つめのthenの内容は無視される。
//結果:2秒後にBが出力され、1秒後にAと40が出力される。

function f6() {
    // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

    const p = wait1().then(logA);
    p.then(() => wait1()).then(logB);
    p.then(() => wait2()).then(logC);
}

//f6();

function f7() {
    // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
    // (= 解決済みの Promise の then を呼び出すとどうなるか)
    const p = wait1().then(logA);
    wait2()
        .then(() => {
            return p.then(logB);
        })
        .then(logC);
}

//f7();

function f8() {
    // NOTE: f9, f10 との比較用
    wait1()
        .then(errX)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}
//f8();
function f9() {
    // NOTE: f10 との比較用
    wait1()
        .then(() => 42)
        .then(errY)
        .catch((e) => log(e.message))
        .finally(logA);
}
//f9();
function f10() {
    // NOTE: then(r, c) と then(r).catch(c) は等しいか？
    wait1()
        .then(() => 42)
        .then(errY, (e) => log(e.message))
        .finally(logA);
}
//f10();

function f11() {
    // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
    new Promise((resolve, reject) => {
        errX();
    }).catch((e) => log(e.message));
}
//f11();

function f12() {
    // new Promise 内だがコールバック関数で throw した場合は？
    new Promise((resolve, reject) => {
        setTimeout(() => errX(), 0);
    }).catch((e) => log(e.message));
}
f12();