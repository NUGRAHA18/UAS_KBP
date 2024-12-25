
        // Pomodoro Timer Logic
        let timer;
        let isWorkTime = true;
        let timeLeft = 25 * 60;

        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const seconds = (timeLeft % 60).toString().padStart(2, '0');
            document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    isWorkTime = !isWorkTime;
                    timeLeft = isWorkTime ? parseInt(document.getElementById('work-time').value) * 60 : parseInt(document.getElementById('break-time').value) * 60;
                    updateTimerDisplay();
                    alert(isWorkTime ? 'Work time! Focus!' : 'Break time! Relax!');
                }
            }, 1000);
        }

        function resetTimer() {
            clearInterval(timer);
            isWorkTime = true;
            timeLeft = parseInt(document.getElementById('work-time').value) * 60;
            updateTimerDisplay();
        }

        document.getElementById('start-timer').addEventListener('click', startTimer);
        document.getElementById('reset-timer').addEventListener('click', resetTimer);

        // To-Do List Logic
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.text}</span>
                    <div>
                        <button class="btn btn-sm btn-success me-2" onclick="toggleTask(${index})">✔</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">✘</button>
                    </div>
                `;
                taskList.appendChild(listItem);
            });
        }

        function saveTasks(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function addTask() {
            const taskText = document.getElementById('new-task').value.trim();
            if (taskText) {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks.push({ text: taskText, completed: false });
                saveTasks(tasks);
                loadTasks();
                document.getElementById('new-task').value = '';
            }
        }

        function toggleTask(index) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            loadTasks();
        }

        function deleteTask(index) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.splice(index, 1);
            saveTasks(tasks);
            loadTasks();
        }

        document.getElementById('add-task').addEventListener('click', addTask);
        window.addEventListener('load', loadTasks);


        // js-for login page 
        function enterWebsite() {
            window.location.href = "index.html";
        }