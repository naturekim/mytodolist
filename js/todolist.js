const feedbackForm = document.getElementById("feedback-form");
const feedbackInput = feedbackForm.querySelector("input");
const feedback = feedbackForm.querySelector("p");
const progressBar = document.getElementById("progress-bar");
const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");
let todos = [];

function saveFeedback(feedbackText) {
    localStorage.setItem("feedback", feedbackText);
}

function paintFeedback(feedbackText) {
    feedback.innerText = feedbackText;
}

function handleFeedbackSubmit() {
    event.preventDefault();
    const feedbackText = feedbackInput.value;
    feedbackInput.value = "";
    paintFeedback(feedbackText);
    saveFeedback(feedbackText);
}

function paintProgressBar() {
    const checkedTodos = document.querySelectorAll("input[type=checkbox]:checked")
    if(checkedTodos) {
        progressBar.value = checkedTodos.length / todos.length * 100;
    }
}

function handleChkbox (event) {
    const li = event.target.parentElement;
    todos.forEach((todo) => {
        if (todo.id === parseInt(li.id)) {
            todo.checked = event.target.checked;
        }
    });
    saveTodos();
    paintProgressBar();
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
    paintProgressBar();
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
    input.addEventListener("click", handleChkbox);
    if(newTodoObj.checked) {
        input.setAttribute("checked", newTodoObj.checked);
    }
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
        todo : todoInput.value,
        checked : false
    }
    paintTodo(newTodoObj);
    todos.push(newTodoObj);
    saveTodos();
    paintProgressBar();
    todoInput.value = "";
}

// 페이지 처음 로드할 때, 로컬스토리지에 저장된 todos 불러와서 보여주기
const savedTodos = localStorage.getItem("todos");
if(savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    todos.forEach(paintTodo);
}

paintProgressBar();

const savedFeedback = localStorage.getItem("feedback");
if(savedFeedback) {
    const feedbackText = savedFeedback;
    paintFeedback(feedbackText);
}

todoForm.addEventListener("submit", handleTodoSubmit);
feedbackForm.addEventListener("submit", handleFeedbackSubmit);