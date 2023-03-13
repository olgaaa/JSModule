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

class Task {
  constructor(task) {
    this.start = task.start;
    this.duration = task.duration;
    this.title = task.title;
    this.end = task.start + task.duration;
    this.width = 200;
    this.height = this.duration * 2;
    this.left = 40;
    // this.id = id++;
  }
  // static id = 1;
}

let myTask = new Task(tasks[1]);
console.log(myTask);

class TaskList {
  constructor(list) {
    list = list.sort(function (a, b) {
      return a.start - b.start;
    });
    this.tasks = list.map((task) => new Task(task));
    this.setTop();
    this.setWidth();
  }

  setTop() {
    this.tasks.forEach((t) => {
      if (Number(t.start) < 300) {
        t.top = t.start * 2;
      } else t.top = (t.start - 300) * 2;
    });
  }

  setWidth() {
    this.tasks.forEach((t) => {
      for (let i = 0; i < this.tasks.length; i++) {
        if (t.end > this.tasks[i].start && t.start < this.tasks[i].start) {
          t.width = 100;
          this.tasks[i].width = 100;
          t.title = t.title.slice(0, 10) + '...';
          if (t.left === 40 && this.tasks[i - 1].left != 140) {
            this.tasks[i].left = 140;
          }
        }
      }
      document.addEventListener('click', (e) => {
        if (e.target.className == 'remove-button') {
          e.target.parentElement.remove();
        }
      });
    });
  }
  //вирівнювання суміжних задач трохи відхиляється від макету, але так логічніше і більш юзер-френдлі, що перша задача буде лівіше, а наступна правіше
}

let myTaskList = new TaskList(tasks);
console.log(myTaskList);

// class RenderTasks {
//   constructor(myTaskList) {}
// }
// const renderTasks = new RenderTasks(myTaskList);

function renderTasks(arr, placement) {
  arr.map((task) => {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    placement.append(taskEl);

    const taskTitle = document.createElement('p');
    taskEl.append(taskTitle);
    taskTitle.textContent = task.title;

    taskEl.insertAdjacentHTML(
      'afterbegin',
      '<button class="remove-button">✕</button>'
    );

    taskEl.setAttribute(
      'style',
      `height: ${task.duration * 2}px; width: ${task.width}px; top: ${
        task.top
      }px; left: ${task.left}px;`
    );
  });
}

let open_modal = document.querySelectorAll('.add-new-task');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];
for (let i = 0; i < open_modal.length; i++) {
  open_modal[i].onclick = function () {
    // клик на открытие
    modal.classList.add('modal_vis'); // добавляем видимость окна
    modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
    body.classList.add('body_block'); // убираем прокрутку
  };
}
close_modal.onclick = function () {
  modal.classList.add('bounceOutDown');
  window.setTimeout(function () {
    modal.classList.remove('modal_vis');
    body.classList.remove('body_block');
  }, 500);
};

const startInput = document.querySelector('#start-time');
const endInput = document.querySelector('#end-time');
const nameInput = document.querySelector('#event-name');
const submitBtn = document.querySelector('#submit-btn');

function convertTime(str) {
  const arr = str.split(':');
  const hours = Number(arr[0]) - 8;
  const minutes = Number(arr[1]);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (convertTime(startInput.value) < 0 || convertTime(endInput.value) > 540) {
    return;
  }
  const start = convertTime(startInput.value);
  const duration = convertTime(endInput.value) - convertTime(startInput.value);
  const title = nameInput.value;
  tasks.addEvent({ start, duration, title });
});

submitBtn.onclick = function () {
  modal.classList.add('bounceOutDown');
  window.setTimeout(function () {
    modal.classList.remove('modal_vis');
    body.classList.remove('body_block');
  }, 500);
};

let morningTaskList = [];
for (const task of myTaskList.tasks) {
  if (Number(task.start) < 300) morningTaskList.push(task);
}

let afternoonTaskList = [];
for (const task of myTaskList.tasks) {
  if (Number(task.start) >= 300) afternoonTaskList.push(task);
}
console.log(morningTaskList);
console.log(afternoonTaskList);

renderTasks(morningTaskList, morningTasks);
renderTasks(afternoonTaskList, afternoonTasks);

// let id = 1;

// const taskList = tasks.map((task) => {
//   task.end = task.start + task.duration;
//   task.left = 40;
//   task.width = 200;
//   task.id = id++;
//   return task;
// });

// console.log(taskList);

// function renderTasks(arr, placement) {
//   arr.map((task) => {
//     const taskEl = document.createElement('div');
//     taskEl.classList.add('task');
//     placement.append(taskEl);

//     const taskTitle = document.createElement('p');
//     taskEl.append(taskTitle);
//     taskTitle.textContent = task.title;

//     if (Number(task.start) < 300)
//       taskEl.setAttribute(
//         'style',
//         `height: ${task.duration * 2}px; width: ${task.width}px; top: ${
//           task.start * 2
//         }px; left: ${task.left}px;`
//       );
//     else
//       taskEl.setAttribute(
//         'style',
//         `height: ${task.duration * 2}px; width: ${task.width}px; top: ${
//           (Number(task.start) - 300) * 2
//         }px; left: ${task.left}px;`
//       );

//     for (let i = 0; i < arr.length; i++) {
//       if (
//         Number(task.end) > Number(arr[i].start) &&
//         Number(task.start) < Number(arr[i].start)
//       )
//         console.log(arr[i]);

//     }
//   });
// }

// let morningTaskList = [];
// for (const task of tasks) {
//   if (Number(task.start) < 300) morningTaskList.push(task);
// }
// console.log(morningTaskList);

// let afternoonTaskList = [];
// for (const task of tasks) {
//   if (Number(task.start) >= 300) afternoonTaskList.push(task);
// }
// console.log(morningTaskList);
// console.log(afternoonTaskList);

// renderTasks(morningTaskList, morningTasks);
// renderTasks(afternoonTaskList, afternoonTasks);
