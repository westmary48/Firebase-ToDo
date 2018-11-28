import 'bootstrap';
import './index.scss';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/Nav/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/data/AuthHelpers';
import initializeTasksPage from './components/tasksPage/tasksPage';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  checkLoginStatus(initializeTasksPage);
  loginButton();
};

initializeApp();
