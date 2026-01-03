const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

const todotemplate = document.createElement("template");
todotemplate.innerHTML = `\
<li>
<div class="view">
    <input class="toggle" type="checkbox" />
    <label class="content"></label>
    <button class="destroy">❌</button>
</div>
</li>
`;

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.form = this.shadowRoot.querySelector("#new-todo-form");
        // TODO: 残りを実装
        //ex11のindex.jsを参考にした
        this.list = this.shadowRoot.querySelector("#todo-list");
        this.input = this.shadowRoot.querySelector("#new-todo");
        // { content: "...", completed: true or false } の配列
        this.todos = [];

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.input.value.trim() === "") {
                return;
            }
            const todo = this.input.value.trim();
            this.input.value = "";
            this.todos.push({ content: todo, completed: false });
            this.renderTodos();
        });
    }

    renderTodos() {
        this.list.innerHTML = "";
        this.todos.forEach((todo, index) => {
            this.clone = todotemplate.content.cloneNode(true);
            const li = document.createElement("li");
            const toggle = this.clone.querySelector("input");
            const label = this.clone.querySelector("label");
            const destroy = this.clone.querySelector("button");

            li.classList.toggle("completed", todo.completed);
            toggle.addEventListener("change", () => {
                todo.completed = toggle.checked;
                this.renderTodos();
            });

            label.textContent = todo.content;
            toggle.checked = todo.completed;
            destroy.addEventListener("click", () => {
                this.todos.splice(index, 1);//this.todos配列のindexを1つ削除
                this.renderTodos();
            });

            li.appendChild(toggle);
            li.appendChild(label);
            li.appendChild(destroy);

            this.list.appendChild(li);
        });
    }
}

customElements.define("todo-app", TodoApp);
