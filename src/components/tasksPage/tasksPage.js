import $ from 'jquery';
import authHelpers from '../../helpers/data/AuthHelpers';
import tasksData from '../../helpers/data/tasksData/tasksData';


const printTasks = (task) => {
  const newString = `
    <div>
      <h1>${task.isCompleted}</h1>
      <h3>${task.task}</h3>
      <div class="form-check form-check-inline">
      <label class="form-check-label" for="inlineCheckbox1">Have I Completed This?</label>
    <input class="form-check-input is-completed-checkbox" type="checkbox" id="${task.id}" value="option1">
  </div>
      <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>Delete</button>
      <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
    </div>
  `;
  $('#single-container').html(newString);
  if (task.isCompleted) {
    $('.is-completed-checkbox').attr('checked', true);
  }
};

const getSingleTask = (e) => {
  const taskId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  tasksData.getSingleTask(taskId).then((singleTask) => {
    printTasks(singleTask);
    console.log('uid', uid);
  })
    .catch((error) => {
      console.error('error in getting one task', error);
    });
};

const buildDropdown = (tasksArray) => {
  let dropDown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Task
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (tasksArray.length) {
    tasksArray.forEach((task) => {
      dropDown += `<div class="dropdown-item get-single" data-dropdown-id=${task.id}>${task.task}</div>`;
    });
  } else {
    dropDown += '<div class="dropdown-item">You have no tasks.</div>';
  }

  dropDown += '</div></div>';
  $('#dropdown-container').html(dropDown);
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  tasksData.getAllTasks(uid)
    .then((tasksArray) => {
      buildDropdown(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteTask = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTask(idToDelete)
    .then(() => {
      tasksPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

const updateIsAvoiding = (e) => {
  const taskId = e.target.id;
  const isAvoiding = e.target.checked;
  tasksData.updatedIsAvoiding(taskId, isAvoiding)
    .then(() => {

    })
    .catch((err) => {
      console.error('error in updating flag', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-task', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
};

const initializeTasksPage = () => {
  tasksPage();
  bindEvents();
};

export default initializeTasksPage;
