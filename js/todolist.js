const titleForm = document.getElementById("title-form");
const title = titleForm.querySelector("h3");
const titleInput = titleForm.querySelector("input");
const titleFormGroup = document.getElementById("title-form-group");

const deleteBtns = document.getElementsByClassName("btn-delete");
const editBtn = document.getElementById("edit-btn");

const todoFormGroup = document.getElementById("todo-form-group");
const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = todoForm.querySelector("ul");

const feedbackForm = document.getElementById("feedback-form");
const feedbackInput = feedbackForm.querySelector("input");
const feedback = feedbackForm.querySelector("p");
const feedbackFormGroup = document.getElementById("feedback-form-group");

const progressGroup = document.getElementById("progress-num-bar");
const progressText = progressGroup.querySelector("label");
const progressBar = document.getElementById("progress-bar");
const checkedCount = document.getElementById("checked-count");
const todosCount = document.getElementById("todos-count");
const currentDate = document.getElementById("current-date");

const TITLE = "title";
const TODOS = "todos";
const FEEDBACK = "feedback";
const HIDDEN = "hidden";

let todos = [];
let editMode = false;

// Title 수정 및 저장
function activeTitleForm(event) {
  titleFormGroup.classList.remove(HIDDEN);
  title.classList.add(HIDDEN);
  titleInput.value = event.target.innerText;
  titleInput.focus();
}
function handleTitleSubmit(event) {
  event.preventDefault();
  const titleText = titleInput.value;
  paintTitle(titleText);
  localStorage.setItem(TITLE, titleText);
}

function paintTitle(titleText) {
  title.innerText = titleText;
  title.classList.remove(HIDDEN);
  titleFormGroup.classList.add(HIDDEN);
}

// Feedback 수정 및 저장
function activeFeedbackForm(event) {
  feedbackFormGroup.classList.remove(HIDDEN);
  feedback.classList.add(HIDDEN);
  feedbackInput.value = event.target.innerText;
  feedbackInput.focus();
}

function handleFeedbackSubmit(event) {
  event.preventDefault();
  const feedbackText = feedbackInput.value;
  paintFeedback(feedbackText);
  localStorage.setItem(FEEDBACK, feedbackText);
}

function paintFeedback(feedbackText) {
  feedback.innerText = feedbackText;
  feedback.classList.remove(HIDDEN);
  feedbackFormGroup.classList.add(HIDDEN);
}

// Progress Bar
function paintProgressBar() {
  const checkedTodos = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  const checkedTodosLength = checkedTodos.length;
  const todosLength = todos.length;

  checkedCount.innerText = checkedTodosLength;
  todosCount.innerText = todosLength;
  if (todosLength === 0) {
    progressBar.value = 0;
    progressText.innerText = "0%";
  } else {
    const ratio = Math.round((checkedTodosLength / todosLength) * 100);
    progressBar.value = ratio;
    progressText.innerText = `${ratio}%`;
  }
}

// Edit Button - Todo Form
function activeTodoForm(event) {
  if (editMode) {
    editMode = false;
    todoFormGroup.classList.add(HIDDEN);
    editBtn.classList.add("btn-primary");
    editBtn.classList.remove("btn-sucess");
    Array.from(deleteBtns).forEach((btn) => {
      btn.classList.add(HIDDEN);
    });
  } else {
    editMode = true;
    todoFormGroup.classList.remove(HIDDEN);
    editBtn.classList.remove("btn-primary");
    editBtn.classList.add("btn-sucess");
    Array.from(deleteBtns).forEach((btn) => {
      btn.classList.remove(HIDDEN);
    });
    todoInput.focus();
  }
}

// Checkbox
function handleChkbox(event) {
  const li = event.target.parentElement;
  const checkbox = event.target;
  todos.forEach((todo) => {
    if (todo.id === parseInt(li.id)) {
      todo.checked = checkbox.checked;
    }
  });
  saveTodos();
  if (checkbox.checked === true) {
    li.classList.add("disabled-text");
  } else {
    li.classList.remove("disabled-text");
  }
  paintProgressBar();
}

// Delete Button
function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
  paintProgressBar();
}

// Todo List
function saveTodos() {
  localStorage.setItem(TODOS, JSON.stringify(todos));
}

function paintTodo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;

  const input = document.createElement("input");
  const cboxId = "chk_" + newTodoObj.id;
  input.setAttribute("id", cboxId);
  input.setAttribute("type", "checkbox");
  if (newTodoObj.checked) {
    input.setAttribute("checked", newTodoObj.checked);
    li.classList.add("disabled-text");
  }
  input.addEventListener("click", handleChkbox);

  const label = document.createElement("label");
  label.setAttribute("for", cboxId);
  label.innerText = newTodoObj.todo;

  const button = document.createElement("button");
  if (editMode) {
    button.setAttribute("class", "btn-delete");
  } else {
    button.setAttribute("class", "btn-delete hidden");
  }
  button.addEventListener("click", deleteTodo);

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(button);
  todoList.appendChild(li);
}

// Add Button
function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodoObj = {
    id: Date.now(),
    todo: todoInput.value,
    checked: false,
  };
  paintTodo(newTodoObj);
  todos.push(newTodoObj);
  saveTodos();
  paintProgressBar();
  todoInput.value = "";
  todoInput.focus();
}

// 페이지 로드 시 실행
// Jan 19, 2023 이 형식으로 오늘 날짜 표시
const date = new Date();
const options = {
  //   weekday: "long",
  year: "numeric",
  day: "numeric",
  month: "short",
};
currentDate.innerText = date.toLocaleDateString("en-us", options);

const savedTitle = localStorage.getItem(TITLE);
if (savedTitle) {
  paintTitle(savedTitle);
}

const savedTodos = localStorage.getItem(TODOS);
if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  todos.forEach(paintTodo);
  paintProgressBar();
}

const savedFeedback = localStorage.getItem(FEEDBACK);
if (savedFeedback) {
  paintFeedback(savedFeedback);
}

todoForm.addEventListener("submit", handleTodoSubmit);
feedbackForm.addEventListener("submit", handleFeedbackSubmit);
titleForm.addEventListener("submit", handleTitleSubmit);
editBtn.addEventListener("click", activeTodoForm);
feedback.addEventListener("click", activeFeedbackForm);
title.addEventListener("click", activeTitleForm);
