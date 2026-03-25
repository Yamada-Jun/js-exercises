import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
    const [val, setVal] = useState(""); //useStateを使う。useStateは、引数に初期値を渡すと、現在の値と、その値を更新するための関数を返す。

    return (
        <>
            <form id="new-todo-form">
                <input type="text" id="new-todo" placeholder="What needs to be done?"
                    value={val}
                    onChange={(e) => setVal(e.target.value)} /> {/* イベントハンドラの利用。inputの値が変更されたときに、setVal関数を呼び出して、valの値を更新する*/ }
                <button type="submit">Add</button>
            </form>
            <ul id="todo-list"></ul>
        </>
    );
}

export default App;
