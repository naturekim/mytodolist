const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");
let todos = [];

function saveTodos(newTodo) {
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newTodo;
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const button = document.createElement("button");
    button.innerText = "❌";
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function handleTodoSubmit (event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    paintTodo(newTodo);
    saveTodos(newTodo);
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