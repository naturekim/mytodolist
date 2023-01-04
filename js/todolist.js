const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");
let todos = [];

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();

    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function paintTodo(newTodoObj) {
    const li = document.createElement("li");
    li.id = newTodoObj.id;
    const span = document.createElement("span");
    span.innerText = newTodoObj.todo;
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const button = document.createElement("button");
    button.addEventListener("click", deleteTodo);
    button.innerText = "❌";
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleTodoSubmit (event) {
    event.preventDefault();
    const newTodoObj = {
        id : Date.now(),
        todo : todoInput.value
    }
    paintTodo(newTodoObj);
    todos.push(newTodoObj);
    saveTodos();
    todoInput.value = "";
}


// 페이지 처음 로드할 때, 로컬스토리지에 저장된 todos 불러와서 보여주기
const savedTodos = localStorage.getItem("todos");
if(savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    todos.forEach(paintTodo);
}

todoForm.addEventListener("submit", handleTodoSubmit);