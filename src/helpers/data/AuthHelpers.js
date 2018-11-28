import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeTasksPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#toDoPage').show();
      $('#navbar-button-todo').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-logout').show();
      initializeTasksPage();
    } else {
      $('#auth').show();
      $('#toDoPage').hide();
      $('#navbar-button-todo').show();
      $('#navbar-button-auth').show();
      $('#navbar-button-logout').hide();
    }
  });
};

export default checkLoginStatus;
