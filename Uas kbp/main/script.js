 // Pomodoro Timer Script
 let timerInterval;
 let isRunning = false;
 let isBreak = false;

 const timerDisplay = document.getElementById('timer');
 const startBtn = document.getElementById('startBtn');
 const pauseBtn = document.getElementById('pauseBtn');
 const resetBtn = document.getElementById('resetBtn');
 const studyTimeInput = document.getElementById('studyTime');
 const breakTimeInput = document.getElementById('breakTime');

 let timeLeft = parseInt(studyTimeInput.value) * 60;

 function updateTimerDisplay() {
     const minutes = Math.floor(timeLeft / 60);
     const seconds = timeLeft % 60;
     timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
 }

 function startTimer() {
     if (!isRunning) {
         isRunning = true;
         startBtn.disabled = true;
         pauseBtn.disabled = false;

         // Open Spotify playlist
         window.open('https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS', '_blank');

         timerInterval = setInterval(() => {
             if (timeLeft > 0) {
                 timeLeft--;
                 updateTimerDisplay();
             } else {
                 clearInterval(timerInterval);
                 isRunning = false;
                 alert(isBreak ? 'Break time is over! Start studying again!' : 'Study time is over! Take a break!');
                 isBreak = !isBreak;
                 timeLeft = (isBreak ? parseInt(breakTimeInput.value) : parseInt(studyTimeInput.value)) * 60;
                 updateTimerDisplay();
                 startTimer();
             }
         }, 1000);
     }
 }

 function pauseTimer() {
     if (isRunning) {
         isRunning = false;
         startBtn.disabled = false;
         pauseBtn.disabled = true;
         clearInterval(timerInterval);
     }
 }

 function resetTimer() {
     isRunning = false;
     clearInterval(timerInterval);
     timeLeft = parseInt(studyTimeInput.value) * 60;
     isBreak = false;
     updateTimerDisplay();
     startBtn.disabled = false;
     pauseBtn.disabled = true;
 }

 startBtn.addEventListener('click', startTimer);
 pauseBtn.addEventListener('click', pauseTimer);
 resetBtn.addEventListener('click', resetTimer);

 updateTimerDisplay();

 // To-Do List Script
 const todoInput = document.getElementById('todoInput');
 const addTodoBtn = document.getElementById('addTodoBtn');
 const todoList = document.getElementById('todoList');

 function loadTodos() {
     const todos = JSON.parse(localStorage.getItem('todos')) || [];
     todos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
 }

 function saveTodos() {
     const todos = [];
     document.querySelectorAll('#todoList li').forEach(item => {
         todos.push({ text: item.querySelector('span').textContent, completed: item.classList.contains('completed') });
     });
     localStorage.setItem('todos', JSON.stringify(todos));
 }

 function addTodoToDOM(text, completed = false) {
     const li = document.createElement('li');
     const span = document.createElement('span');
     span.textContent = text;
     li.appendChild(span);

     const completeBtn = document.createElement('button');
     completeBtn.textContent = '✔';
     completeBtn.addEventListener('click', () => {
         li.classList.toggle('completed');
         saveTodos();
     });
     li.appendChild(completeBtn);

     const deleteBtn = document.createElement('button');
     deleteBtn.textContent = '✖';
     deleteBtn.addEventListener('click', () => {
         li.remove();
         saveTodos();
     });
     li.appendChild(deleteBtn);

     if (completed) li.classList.add('completed');

     todoList.appendChild(li);
     saveTodos();
 }

 addTodoBtn.addEventListener('click', () => {
     const text = todoInput.value.trim();
     if (text) {
         addTodoToDOM(text);
         todoInput.value = '';
     }
 });

 loadTodos();