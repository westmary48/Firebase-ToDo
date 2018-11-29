import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/Nav/navbar';
import loginButton from './components/Auth/auth';
import AuthHelpers from './helpers/data/AuthHelpers';
import initializeTasksPage from './components/tasksPage/tasksPage';
// import showTaskForm from './components/addEditTasks/addEditTasks';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  AuthHelpers.checkLoginStatus(initializeTasksPage);
  loginButton();
  // $('#add-edit-task').on('click', showTaskForm);
};

initializeApp();
