import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <>
            <form id="new-todo-form">
                <input type="text" id="new-todo" placeholder="What needs to be done?" />
                <button type="submit">Add</button>
            </form>
            <ul id="todo-list"></ul>
        </>
    );
}

export default App;
