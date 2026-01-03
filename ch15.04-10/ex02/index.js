const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    // エヴァ風: 完了時に紫・赤・警告色・太字・装飾
    li.classList.toggle("bg-gradient-to-r", toggle.checked);
    li.classList.toggle("from-purple-900", toggle.checked);
    li.classList.toggle("to-red-700", toggle.checked);
    li.classList.toggle("border-orange-400", toggle.checked);
    li.classList.toggle("shadow-orange-400/60", toggle.checked);
    li.classList.toggle("opacity-90", toggle.checked);
    label.classList.toggle("line-through", toggle.checked);
    label.classList.toggle("text-orange-400", toggle.checked);
    label.classList.toggle("drop-shadow-[0_0_16px_orange]", toggle.checked);
    label.classList.toggle("font-black", toggle.checked);
  });
  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
