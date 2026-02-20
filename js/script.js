document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const dateInput = document.getElementById('date-input');
  const todoList = document.getElementById('todo-list');
  const filterInput = document.getElementById('filter-input');
  const clearAllBtn = document.getElementById('clear-all-btn');

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Render saved todos
  renderAll();

  // Add To-Do
  todoForm.addEventListener('submit', e => {
    e.preventDefault();

    const task = todoInput.value.trim();
    const date = dateInput.value;

    // Validate input
    if (task === '' || date === '') {
      alert('Please fill in both task and date.');
      return;
    }

    const newTodo = { task, date, completed: false };
    todos.push(newTodo);
    saveTodos();
    renderAll();

    // Clear form
    todoInput.value = '';
    dateInput.value = '';
  });

  // Handle clicks (Delete / Complete)
  todoList.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    const index = li.dataset.index;

    if (e.target.classList.contains('delete-btn')) {
      todos.splice(index, 1);
      saveTodos();
      renderAll();
    }

    if (e.target.classList.contains('complete-btn')) {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderAll();
    }
  });

  // Filter To-Dos
  filterInput.addEventListener('keyup', e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('#todo-list li').forEach(item => {
      const itemText = item.textContent.toLowerCase();
      item.style.display = itemText.includes(text) ? 'flex' : 'none';
    });
  });

  // Clear All Button
  clearAllBtn.addEventListener('click', () => {
    if (todos.length === 0) {
      alert('No tasks to clear!');
      return;
    }
    const confirmClear = confirm('Are you sure you want to delete all tasks?');
    if (confirmClear) {
      todos = [];
      saveTodos();
      renderAll();
    }
  });

  // Save todos to localStorage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Render all todos
  function renderAll() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => renderTodo(todo, index));
  }

  // Render single todo
  function renderTodo(todo, index) {
    const li = document.createElement('li');
    li.dataset.index = index;
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.task} - <small>${todo.date}</small></span>
      <div class="buttons">
        <button class="complete-btn">${todo.completed ? 'Undo' : 'Done'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  }
});