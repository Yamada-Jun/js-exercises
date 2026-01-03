const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
let todos = [];

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
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      deleteTodo(todo.content);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

window.addEventListener("hashchange", () => {
  // ここを実装してね
  //console.log('current hash:', location.hash);
  const active_todos = todos.filter((todo) => todo.completed === false);
  const completed_todos = todos.filter((todo) => todo.completed === true);
  // hashごとに表示を切り替える
  if (location.hash === "#/active") {
      //renderTodosにtodoを渡すと表示される
      renderTodos(active_todos);
  } else if (location.hash === "#/completed") {
      renderTodos(completed_todos);
  } else {
      renderTodos(todos);
  }

});

function deleteTodo(content) {
  todos = todos.filter((t) => t.content !== content);
}
