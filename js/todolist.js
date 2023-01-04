const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

function addTodo(newTodo) {
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
    addTodo(todoInput.value);
    todoInput.value = "";
}

todoForm.addEventListener("submit", handleTodoSubmit);