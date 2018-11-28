import $ from 'jquery';
import authHelpers from '../../helpers/data/AuthHelpers';
import tasksData from '../../helpers/data/tasksData/tasksData';
import initializeTasksPage from '../tasksPage/tasksPage';

const formBuilder = (task) => {
  const form = `
    <div class="form-group">
      <label for="form-tasks-id">Task:</label>
      <input type="text" class="form-control" value="${task.id}" id="form-task-task" placeholder="task">
    </div>
    <div class="form-group">
      <label for="form-task-isCompleted">isCompleted:</label>
      <input type="text" class="form-control" value="${task.task}" id="form-task-task" placeholder="walking the dog">
    `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    task: $('#form-tasks-task').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return task;
};
const buildAddForm = () => {
  const emptyTask = {
    uid: '',
    task: '',
  };

  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task">Save New Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#tasks').hide();
};

const addNewTask = () => {
  const newTask = gettingTaskFromForm();
  tasksData.addNewFriend(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#tasks').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const showTaskForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit Task</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#taskss').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateTask = (e) => {
  const updatedTask = gettingTaskFromForm();
  const taskId = e.target.dataset.taskEditId;
  tasksData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#task-container').html('');
      $('#tasks').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};


$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showTaskForm);
$('body').on('click', '#edit-task', updateTask);

export default buildAddForm;
