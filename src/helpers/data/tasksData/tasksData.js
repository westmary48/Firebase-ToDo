import axios from 'axios';
import apiKeys from '../../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTasks = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const tasksObject = results.data;
      const tasksArray = [];
      if (tasksObject !== null) {
        Object.keys(tasksObject).forEach((taskId) => {
          tasksObject[taskId].id = taskId;
          tasksArray.push(tasksObject[taskId]);
        });
      }
      resolve(tasksArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteTask = taskId => axios.delete(`${firebaseUrl}/tasks/${taskId}.json`);

const addNewTask = taskObject => axios.post(`${firebaseUrl}/tasks.json`, JSON.stringify(taskObject));

const updateTask = (taskObject, taskId) => axios.put(`${firebaseUrl}/tasks/${taskId}.json`, JSON.stringify(taskObject));

const updatedIsAvoiding = (taskId, isAvoiding) => axios.patch(`${firebaseUrl}/tasks/${taskId}.json`, { isAvoiding });

export default {
  addNewTask,
  getSingleTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updatedIsAvoiding,
};
