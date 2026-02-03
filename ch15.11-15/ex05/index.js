import { openDB } from "https://esm.sh/idb";

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");


const dbPromise = openDB("todos-db", 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains("todos")) {
            const store = db.createObjectStore("todos", {
                keyPath: "id",
                autoIncrement: true,
            });
            store.createIndex("nameIndex", "content", { unique: false });
        }
        renderTodos();
    },
});

// 追加
async function setTodo(todo) {
    const db = await dbPromise;
    const id = await db.add("todos", todo);
    console.log(todo);
    return id;
}

// 全件取得
async function getTodos() {
    const db = await dbPromise;
    const todos = await db.getAll("todos");
    console.log(todos);
    return todos;
}

// 更新
async function updateTodo(todo) {
    const db = await dbPromise;
    await db.put("todos", todo);
}

// 削除
async function deleteTodo(id) {
    const db = await dbPromise;
    await db.delete("todos", id);
}

async function renderTodos() {
    list.innerHTML = "";
    const todos = await getTodos();
    //console.log(todos);
    todos.forEach((todo, index) => {
        const clone = template.content.cloneNode(true);
        const li = clone.querySelector("li");
        const toggle = clone.querySelector("input");
        const label = clone.querySelector("label");
        const destroy = clone.querySelector("button");

        li.classList.toggle("completed", todo.completed);
        toggle.addEventListener("change", async () => {
            todo.completed = toggle.checked;
            await updateTodo(todo);
            renderTodos();
        });
        label.textContent = todo.content;
        toggle.checked = todo.completed;
        if (todo.completed) {
            label.style.textDecorationLine = "line-through";
        } else {
            label.style.textDecorationLine = "none";
        }
        destroy.addEventListener("click", async () => {
            todos.splice(index, 1);
            await deleteTodo(todo.id);
            renderTodos();
        });

        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderTodos();
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let todos = await getTodos();
    if (input.value.trim() === "") {
        return;
    }
    const todo = input.value.trim();
    input.value = "";

    if (todos === null) {
        todos = [];
    }
    await setTodo({ content: todo, completed: false })
    renderTodos();
});

//renderTodosを定期的によぶ
setInterval(() => {
    renderTodos();
}, 5000);