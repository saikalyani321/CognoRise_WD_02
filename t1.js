document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', manageTask);

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask(event) {
    event.preventDefault();
    const taskInput = document.querySelector('#task-input');
    const task = taskInput.value.trim();
    if (task) {
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);
    document.querySelector('#task-list').appendChild(li);
}

function manageTask(event) {
    if (event.target.classList.contains('delete-btn')) {
        const li = event.target.parentElement;
        removeTaskFromLocalStorage(li.textContent.replace('Delete', '').trim());
        li.remove();
    }
}

function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
