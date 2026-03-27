import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
    const [input, setInput] = useState(""); //useStateを使う。useStateは、引数に初期値を渡すと、現在の値と、その値を更新するための関数を返す。
    const [todos, setTodos] = useState([]); //todosは、現在のTODOリストの値を保持するための状態変数。setTodosは、その値を更新するための関数。

    //イベントリスナーを登録する(form.addEventListener("submit"))
    //ボタンが押されたときに、inputの値をtodosに追加し、inputを空にする
    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = input.trim();
        if (todo === "") {
            return;
        }
        setInput("");
        todos.push({ content: todo, completed: false });
        //renderTodos();
    }

    //イベントリスナーを登録する(toggle.addEventListener("change", () => {…})
    //チェックボックスの状態が変化したときに、todosのTodoのcompletedを切り替える
    const handleToggle = (index) => {
        const newTodos = [];
        for (let i = 0; i < todos.length; i++) {
            if (i === index) {
                //押されたtodoのcompletedを切り替える
                newTodos.push({ ...todos[i], completed: !todos[i].completed });
            } else {
                newTodos.push(todos[i]);
            }
        }
        setTodos(newTodos);
    };

    //イベントリスナーを登録する(destroy.addEventListener("click",...)
    const handleDestroy = (index) => {
        const newTodos = [];
        for (let i = 0; i < todos.length; i++) {
            if (i !== index) {
                //押されてないTodoだけnewTodosに追加する
                newTodos.push(todos[i]);
            }
        }
        setTodos(newTodos);
    };

    //todo_listにjsx形式のtodosの内容を反映させるためにtodosをループ
    let todo_list = [];
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo_list.push(
            <li key={i} className={todo.completed ? "completed" : ""}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(i)}
                    />
                    <label className="content">{todo.content}</label>
                    <button className="destroy" onClick={() => handleDestroy(i)}>
                        ❌
                    </button>
                </div>
            </li>
        );
    }

    return (
        <div>
            { /* ここからが15.4-10.6 のtemplete*/}
            <style>
                {`
          .completed {
            text-decoration: line-through;
            }
          `}
            </style>
            <form onSubmit={handleSubmit}>
                { /* inputに入力されるたびに、onChangeでuseStateのinputの状態を更新し、inputフォームに再表示する*/}
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="What needs to be done?"
                />
                <button type="submit">Add</button>
            </form>
            <ul id="todo-list">
                { /* ここまでが15.4-10.6 のtemplete*/}

                { /* {}で囲むとJSXの中にJavaScriptの値を挿入できる */}
                {todo_list}
            </ul>
        </div>
    );
}

export default App;
