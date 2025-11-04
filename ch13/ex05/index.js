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
function g1() {
    // TODO: then のネストを無くしなさい
    return wait(1000)
        .then(() => {
            console.log("A")
        })
        .then(wait(2000).then(() => {
            console.log("B")
        })
        .then(wait(3000).then(() => {
            console.log("C")
        })))
}
//プロミスチェーンの仕様に従い書き直す。
//g1();

function g2() {
    // TODO: new Promise を使わないように書き換えなさい
    return wait(1000)
            .then(() => console.log("A"))
            .then(() => wait(2000))
            .then(() => console.log("B"))
            .then(() => wait(3000))
            .then(() => console.log("C"));
}
//wait()はPromiseのインスタンスを返すので、new Promiseを書く必要がない。
//g2();

function g3() {
    // 以下2つの関数が存在するとします (中身は適当)
    function fetchUser() {
        return Promise.resolve({ id: 42, name: "John" });
    }
    function fetchUserFriends(user) {
        return Promise.resolve([
            { name: "Sam", id: 100 },
            { name: "Bob", id: 1 },
        ]);
    }

    // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
    return fetchUser()
        .then(user => fetchUserFriends(user).then(friends => ({ user, friends })))
        .then(({ user, friends }) => {
            console.log(`${user.name} has ${friends.length} friends!`);
        });
}
//プロミスチェーンで次のthenに渡す引数にuserを含めたオブジェクトで渡すことでtempを削除できる。
//g3();

function g4() {
    function someFunction() {
        return 42;
    }

    // NOTE: この関数 g4 は Promise を返す必要があるものとする
    // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
    // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
    return Promise.resolve(someFunction());
}
//Promise.resolve()は即座に解決されたPromiseを返すので、これの中でsomeFunction()を実行するだけで良い。

//g4();