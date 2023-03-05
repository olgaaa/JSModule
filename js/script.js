const tasks = [
  {
    start: 0,
    duration: 15,
    title: 'Exercise',
  },
  {
    start: 25,
    duration: 30,
    title: 'Travel to work',
  },
  {
    start: 30,
    duration: 30,
    title: 'Plan day',
  },
  {
    start: 60,
    duration: 15,
    title: "Review yesterday's commits",
  },
  {
    start: 100,
    duration: 15,
    title: 'Code review',
  },

  {
    start: 180,
    duration: 90,
    title: 'Have lunch with John',
  },

  {
    start: 360,
    duration: 30,
    title: 'Skype call',
  },
  {
    start: 370,
    duration: 45,
    title: 'Follow up with designer',
  },
  {
    start: 405,
    duration: 30,
    title: 'Push up branch',
  },
];

const morningTimeContainer = document.getElementById('morningTimeSlots');
const afternoonTimeContainer = document.getElementById('afternoonTimeSlots');

function renderTime(element, firstHour, duration) {
  let time = firstHour;

  for (let i = 0; i < duration / 30; i++) {
    const li = document.createElement('li');
    li.classList.add('timeslot');
    if (i % 2 === 0) {
      li.classList.add('fullHour');
      li.innerHTML = `<span>${time}:00</span>`;
      element.appendChild(li);
    } else {
      li.classList.add('halfHour');
      li.innerHTML = `<span>${time}:30</span>`;
      element.appendChild(li);
      time = time + 1;
    }
  }
}
renderTime(morningTimeContainer, 8, 300);
renderTime(afternoonTimeContainer, 1, 241);

const morningTasks = document.getElementById('morningTasks');
const afternoonTasks = document.getElementById('afternoonTasks');

let id = 1;

const taskList = tasks.map((task) => {
  task.end = task.start + task.duration;
  task.left = 0;
  task.width = 200;
  task.id = id++;
  return task;
});

console.log(taskList);

let morningTaskList = [];
for (const task of tasks) {
  if (Number(task.start) < 300) morningTaskList.push(task);
}
console.log(morningTaskList);

let afternoonTaskList = [];
for (const task of tasks) {
  if (Number(task.start) >= 300) afternoonTaskList.push(task);
}
console.log(morningTaskList);
console.log(afternoonTaskList);

function renderMorningTasks() {
  morningTaskList.map((task) => {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    morningTasks.append(taskEl);

    const taskTitle = document.createElement('p');
    taskEl.append(taskTitle);
    taskTitle.textContent = task.title;

    taskEl.setAttribute(
      'style',
      `height: ${task.duration * 2}px; width: ${task.width}px; top: ${
        task.start * 2
      }px; left: ${task.left}px;`
    );
    return taskEl;
  });
}

renderMorningTasks();

function renderAfternoonTasks() {
  afternoonTaskList.map((task) => {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    afternoonTasks.append(taskEl);

    const taskTitle = document.createElement('p');
    taskEl.append(taskTitle);
    taskTitle.textContent = task.title;

    taskEl.setAttribute(
      'style',
      `height: ${task.duration * 2}px; width: ${task.width}px; top: ${
        task.start * 2 - 600
      }px; left: ${task.left}px;`
    );
    return taskEl;
  });
}

renderAfternoonTasks();
