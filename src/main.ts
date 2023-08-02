import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  todo: string;
  checkbox: boolean;
  date: number;
}

const app = document.querySelector<HTMLDivElement>('#app')!;
const div = document.createElement('div');
const form = document.createElement('form');
const inputTodoElement = document.createElement('input');
const buttonElement = document.createElement('button');
div.id = "create-todo"
div.classList.add("flex","w-100", "items-center", "flex-column","justify-center")
form.id = "todo-form"
form.classList.add("flex","w-100", "items-center", "flex-column","justify-center")
inputTodoElement.type = "text";
inputTodoElement.placeholder = "Enter your todo";
inputTodoElement.id = "todo-input";
buttonElement.innerText = "Add Todo";
buttonElement.id = "add-todo";
form.append(inputTodoElement, buttonElement);
const todosElement = document.createElement("div");
todosElement.id = "todos";
div.append(form);
app.append(div,todosElement);

let todos: Todo[] = [];

const savedTodos = getTodos();
todos = savedTodos;
savedTodos.forEach((todo) => {
  addTodo(todo);

})
// console.log(saveTodos)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = inputTodoElement.value;
  const id = uuidv4();
  const date = Date.now();
  
  const todoObj: Todo = {
    id: id,
    todo: todo,
    checkbox: false,
    date: date,
  }

  todos.push(todoObj);
  saveTodos();
  addTodo(todoObj);
  inputTodoElement.value = "";
})



function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(): Todo[] {
  const todosString = localStorage.getItem("todos");
  if(todosString === null) {
    return [];
  }
  return JSON.parse(todosString);
}

function addTodo(item: Todo) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    item.checkbox = checkbox.checked;
    saveTodos();
  })
  checkbox.checked = item.checkbox;
  label.innerHTML = item.todo;
  li.append(checkbox, label);

  todosElement.append(li);
  
}