const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
    // TODO: ここで API を呼び出してタスク一覧を取得し、
    // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    //第一引数：パス: /api/tasks
    let response = await fetch('/api/tasks', {
        method: 'GET'//メソッド: GET
    })
    let items = await response.json();//fetchが解決されるのは、ヘッダーが帰ってきたときなので、bodyに関してもawaitで受け取る必要があるらしい。.json()も必須
    console.log(items);
    let status = await response.status;//fetchが解決されるのは、ヘッダーが帰ってきたときなので、statusに関してもawaitで受け取る必要があるらしい
    //console.log(task);
    //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
    checkStatus(status);
    if (items.items.length === 0) return;//タスクがないなら渡さない
    appendToDoItem(items); //追加したタスク一覧を反映
});

form.addEventListener("submit", (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    e.preventDefault();
    // 両端からホワイトスペースを取り除いた文字列を取得する
    const todo = input.value.trim();
    if (todo === "") {
        return;
    }

    // new-todo の中身は空にする
    input.value = "";

    // TODO: ここで API を呼び出して新しいタスクを作成し
    // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    (async () => {
        //第一引数：パス: /api/tasks
        let response = await fetch('/api/tasks', {
            method: 'POST',//メソッド: POST
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'//MIME typesはapplication/jsonを指定。下記bodyの形式に関する情報
            },
            body: JSON.stringify({ name: todo })//name 属性のみ必要
        })
        let task = await response.json();//fetchが解決されるのは、ヘッダーが帰ってきたときなので、bodyに関してもawaitで受け取る必要があるらしい。.json()も必須
        let status = await response.status;//fetchが解決されるのは、ヘッダーが帰ってきたときなので、statusに関してもawaitで受け取る必要があるらしい
        //console.log(task);
        //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
        checkStatus(status);
        appendToDoItem(task); //追加したタスクをリストに反映
    })();
    console.log(document.cookie);
});

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
    toggle.addEventListener("change", () => {
        (async () => {
            //第一引数：パス: /api/tasks/{id}
            let response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',//メソッド: PATCH
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'//MIME typesはapplication/jsonを指定。下記bodyの形式に関する情報
                },
                body: JSON.stringify({ status: toggle.checked ? "completed" : "active" })//Task オブジェクトの id 以外の属性の内、更新対象の属性のみがあれば良い
            })
            let status = await response.status;//fetchが解決されるのは、ヘッダーが帰ってきたときなので、statusに関してもawaitで受け取る必要があるらしい
            //console.log(status);
            if (status === 200) {//成功したら label.style.textDecorationLine を変更
                if (toggle.checked) {
                    label.style.textDecorationLine = "line-through";
                } else {
                    label.style.textDecorationLine = "none";
                }
            }
            //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
            checkStatus(status);
        })();
    });

    const destroy = document.createElement("button");
    destroy.type = "button";
    destroy.textContent = "❌";
    // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
    // 成功したら elem を削除しなさい
    destroy.addEventListener("click", () => {
        (async () => {
            //第一引数：パス: /api/tasks/{id}
            let response = await fetch(`/api/tasks/${task.id}`, {
                method: 'DELETE',//メソッド: DELETE
            })
            let status = await response.status;//fetchが解決されるのは、ヘッダーが帰ってきたときなので、statusに関してもawaitで受け取る必要があるらしい
            //console.log(status);
            if (status === 204) { //成功したら elem を削除
                elem.remove();
            }
            //サーバからエラーレスポンスが返却されたときは、ToDo リストの表示を更新させずエラーの内容を alert で表示する
            checkStatus(status);
        })();
    });

    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
}

function checkStatus(status_code) {
    if (status_code >= 400 && status_code <= 499) { //ステータスコード: 400 - 499
        alert(`ステータスコード: ${status_code}`);
    }
}