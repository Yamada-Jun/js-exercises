const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

let todos_g = [];//storageが無効化されている場合に使用するtodos

function getTodos() {
    let todos;
    try { todos = JSON.parse(sessionStorage.getItem("todos")); }
    catch (e) { todos = todos_g; }//無効化されている場合はグローバル変数を使う

    //console.log(todos);
    if (todos === null) {
        todos = [];
    }
    return todos;
}
function setTodos(todos) {
    try { sessionStorage.setItem("todos", JSON.stringify(todos)); }
    catch (e) { todos_g = todos; }//無効化されている場合はグローバル変数に保存する
}

document.addEventListener("DOMContentLoaded", () => {
    renderTodos(getTodos());
});

window.addEventListener("storage", () => {
    renderTodos(getTodos());
});

function renderTodos(todos) {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
        const clone = template.content.cloneNode(true);
        const li = clone.querySelector("li");
        const toggle = clone.querySelector("input");
        const label = clone.querySelector("label");
        const destroy = clone.querySelector("button");

        li.classList.toggle("completed", todo.completed);
        toggle.addEventListener("change", () => {
            todo.completed = toggle.checked;
            renderTodos(todos);
        });
        label.textContent = todo.content;
        toggle.checked = todo.completed;
        if (todo.completed) {
            label.style.textDecorationLine = "line-through";
        } else {
            label.style.textDecorationLine = "none";
        }
        destroy.addEventListener("click", () => {
            todos.splice(index, 1);
            deleteTodo(todo.content);
            renderTodos(todos);
        });

        list.appendChild(li);
        setTodos(todos);

        //console.log("sessionStorage.getItem");
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todos = getTodos();
    if (input.value.trim() === "") {
        return;
    }
    const todo = input.value.trim();
    input.value = "";

    if (todos === null) {
        todos = [];
    }
    todos.push({ content: todo, completed: false });
    renderTodos(todos);
    setTodos(todos);
});


function deleteTodo(content) {
    let todos = getTodos();
    todos = todos.filter((t) => t.content !== content);
    setTodos(todos);
}
