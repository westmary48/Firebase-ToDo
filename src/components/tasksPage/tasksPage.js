import $ from 'jquery';
// import { auth } from 'firebase';
import authHelpers from '../../helpers/data/AuthHelpers';
import tasksData from '../../helpers/data/tasksData/tasksData';


const printTasks = (task) => {
  const taskString = `
      <div>
        <h1>${task.task}</h1>
        <button class="btn btn-danger delete-btn" data-delete-id=${task.task}>X</button>
        <button class="btn btn-info edit-btn" data-edit-id=${task.task}>Edit</button>
      
        <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineCheckbox1">Is this Complete?</label>
          <input class="form-check-input is-avoiding-checkbox" type="checkbox" id="${task.task}">
        </div>
        </div>
    `;
  $('#single-container').html(taskString);
//   if (task.isAvoiding) {
//     $('.is-avoiding-checkbox').attr('checked', true);
//   }
};

const getSingleTask = (e) => {
  const taskId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  tasksData.getSingleTask(taskId).then((singleTask) => {
    console.log('uid', uid);
    printTasks(singleTask);
  })
    .catch((error) => {
      console.error('error in getting one task', error);
    });
};

const buildDropdown = (tasksArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Task
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (tasksArray.length) {
    tasksArray.forEach((task) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${task.id}>${task.name}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">You have no tasks.</div>';
  }

  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
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
