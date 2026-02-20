document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const dateInput = document.getElementById('date-input');
  const todoList = document.getElementById('todo-list');
  const filterInput = document.getElementById('filter-input');
  const clearAllBtn = document.getElementById('clear-all-btn');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  renderAll();

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = dateInput.value;
    if (task === '' || date === '') {
      alert('Please fill in both fields.');
      return;
    }
    const newTodo = { task, date, completed: false };
    todos.push(newTodo);
    saveTodos();
    renderAll();
    todoInput.value = '';
    dateInput.value = '';
  });

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

  filterInput.addEventListener('keyup', e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('#todo-list li').forEach(item => {
      const itemText = item.textContent.toLowerCase();
      item.style.display = itemText.includes(text) ? 'flex' : 'none';
    });
  });

  clearAllBtn.addEventListener('click', () => {
    if (todos.length === 0) return alert('No tasks to clear!');
    if (confirm('Clear all tasks?')) {
      todos = [];
      saveTodos();
      renderAll();
    }
  });

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderAll() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => renderTodo(todo, index));
  }

  function renderTodo(todo, index) {
    const li = document.createElement('li');
    li.dataset.index = index;
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.task} <small>(${todo.date})</small></span>
      <div class="buttons">
        <button class="complete-btn">${todo.completed ? 'Undo' : 'Done'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  }
});