const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const add_button = document.querySelector("#add_button");
let response_waiting = false;//レスポンス待ちフラグ

async function getData() {
    let response;
    try {
        //第一引数：パス: /api/tasks
        response = await fetchWithTimeout('/api/tasks', {
            method: 'GET',//メソッド: GET
            timeout: 3000 //3秒でタイムアウト
        })
    } catch (e) {
        if (e.name === 'AbortError') {//AbortErrorはsignalがabortされた場合に発生
            return false;
        } else {
            throw e;
        }
    }
    let items = await response.json();
    let status = await response.status;

    //サーバからエラーレスポンスが返却されたとき
    if (status >= 400 && status <= 599) { //ステータスコード: 400 - 599
        return false;
    }
    else {
        console.log(items);
        if (items.items.length !== 0)//タスクがないなら渡さない
        {
            appendToDoItem(items); //追加したタスク一覧を反映
        }
    }
    return true;
}
function alertError(success) {
    if (!success) {
        alert(`3秒以上経過してもレスポンスを受信できません`);
    }
    response_waiting = false;
    add_button.disabled = false;
    input.disabled = false;
}



document.addEventListener("DOMContentLoaded", async () => {
    // TODO: ここで API を呼び出してタスク一覧を取得し、
    // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    await retryWithExponentialBackoff(getData, 3, alertError);
    //console.log(task);    
});

async function postData(todo) {
    let response;
    try {
        //第一引数：パス: /api/tasks
        response = await fetchWithTimeout('/api/tasks', {
            method: 'POST',//メソッド: POST
            timeout: 3000, //3秒でタイムアウト
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'//MIME typesはapplication/jsonを指定。下記bodyの形式に関する情報
            },
            body: JSON.stringify({ name: todo })//name 属性のみ必要
        })
    } catch (e) {
        if (e.name === 'AbortError') {//AbortErrorはsignalがabortされた場合に発生
            return false;
        } else {
            throw e;
        }
    }
    let task = await response.json();//fetchが解決されるのは、ヘッダーが帰ってきたときなので、bodyに関してもawaitで受け取る必要があるらしい。.json()も必須
    let status = await response.status;//fetchが解決されるのは、ヘッダーが帰ってきたときなので、statusに関してもawaitで受け取る必要があるらしい
    //console.log(task);
    //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
    if (status >= 400 && status <= 599) { //ステータスコード: 400 - 599
        return false;
    }
    else {
        appendToDoItem(task); //追加したタスクをリストに反映
    }
    return true;
}

form.addEventListener("submit", async (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    e.preventDefault();
    // 両端からホワイトスペースを取り除いた文字列を取得する
    const todo = input.value.trim();
    if (todo === "") {
        return;
    }
    add_button.disabled = true;

    // new-todo の中身は空にする
    input.value = "";

    // TODO: ここで API を呼び出して新しいタスクを作成し
    // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

    await retryWithExponentialBackoff(postData, 3, alertError, todo);

    //console.log(document.cookie);
});


async function patchData(task, label, toggle) {
    let response;
    try {
        //第一引数：パス: /api/tasks/{id}
        response = await fetch(`/api/tasks/${task.id}`, {
            method: 'PATCH',//メソッド: PATCH
            timeout: 3000, //3秒でタイムアウト
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'//MIME typesはapplication/jsonを指定。下記bodyの形式に関する情報
            },
            body: JSON.stringify({ status: toggle.checked ? "completed" : "active" })//Task オブジェクトの id 以外の属性の内、更新対象の属性のみがあれば良い
        })
    } catch (e) {
        if (e.name === 'AbortError') {//AbortErrorはsignalがabortされた場合に発生
            return false;
        } else {
            throw e;
        }
    }
    let status = await response.status;

    //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
    if (status >= 400 && status <= 599) { //ステータスコード: 400 - 599
        return false;
    }
    else {
        //成功したら label.style.textDecorationLine を変更
        if (toggle.checked) {
            label.style.textDecorationLine = "line-through";
        } else {
            label.style.textDecorationLine = "none";
        }
    }
    return true;
}



async function deleteData(task, elem) {
    let response;
    try {
        //第一引数：パス: /api/tasks/{id}
        response = await fetch(`/api/tasks/${task.id}`, {
            method: 'DELETE',//メソッド: DELETE
            timeout: 3000 //3秒でタイムアウト
        })
    } catch (e) {
        if (e.name === 'AbortError') {//AbortErrorはsignalがabortされた場合に発生
            return false;
        } else {
            throw e;
        }
    }
    let status = await response.status;

    //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
    if (status >= 400 && status <= 599) { //ステータスコード: 400 - 599
        return false;
    }
    else {
        //成功したら elem を削除
        elem.remove();
    }
    return true;
}

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
    // 配列の場合は各要素に対して再帰的に処理する
    if (Array.isArray(task.items)) {
        //console.log("tasks");
        task.items.forEach(item => appendToDoItem(item));
        return;
    }
    //console.log("task");
    //console.log(task);
    // ここから #todo-list に追加する要素を構築する
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = task.name;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";

    if (task.status === "completed") {//リロード時に各タスクのstatusから取り消し線とチェックボックスを更新する
        toggle.checked = true;
        label.style.textDecorationLine = "line-through";
    } else {
        toggle.checked = false;
        label.style.textDecorationLine = "none";
    }

    // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
    // 成功したら label.style.textDecorationLine を変更しなさい
    toggle.addEventListener("change", async () => {
        if (response_waiting) {//レスポンス待ち中なら無視する.トグルの状態を元に戻す
            toggle.checked = !toggle.checked;
            return;
        } else {
            await retryWithExponentialBackoff(patchData, 3, alertError, task, label, toggle);
        }
    });

    const destroy = document.createElement("button");
    destroy.type = "button";
    destroy.textContent = "❌";
    // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
    // 成功したら elem を削除しなさい
    destroy.addEventListener("click", async () => {
        if (response_waiting) {//レスポンス待ち中なら無視する
            return;
        } else {
            await retryWithExponentialBackoff(deleteData, 3, alertError, task, elem);
        }
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
}


// この関数は fetch() と似ていますが、options オブジェクトに timeout プロパティを追加でサポートし、
// 指定されたミリ秒以内に完了しない場合は fetch を中断します。
function fetchWithTimeout(url, options = {}) {
    if (options.timeout) {  // timeout プロパティが存在し、0 でない場合
        let controller = new AbortController();  // コントローラーを作成
        options.signal = controller.signal;      // signal プロパティを設定
        // 指定されたミリ秒が経過したら abort シグナルを送信するタイマーを開始します。
        // このタイマーはキャンセルしません。fetch 完了後に abort() を呼び出しても効果はありません。
        setTimeout(() => { controller.abort(); }, options.timeout);
    }
    // 通常の fetch を実行
    return fetch(url, options);
}

//問題 11.16から持ってきた関数を非同期版に書き換え、リトライ回数ではなく、タイムアウト時間を指定するように変更、funcが引数を受け取れるように変更
async function retryWithExponentialBackoff(func, timeoutSeconds, callback, ...args) {
    const startTime = Date.now();
    let count = 0;
    let delay = 0;
    response_waiting = true;
    add_button.disabled = true;
    input.disabled = true;

    const retryFunc = async () => {
        if (await func(...args)) {
            callback(true);
        } else {
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed < timeoutSeconds) {
                delay = Math.pow(2, count) * 1000;
                count++;
                setTimeout(retryFunc, delay);
            } else {
                callback(false);
            }
        }
    };
    retryFunc();
}
