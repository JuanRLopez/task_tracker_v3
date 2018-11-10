import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function tasks(state0 = [], action) {
  switch(action.type) {
    case 'TASK_LIST':
      localStorage.setItem('tasks', JSON.stringify(action.data));
      return action.data;
    default:
      return JSON.parse(localStorage.getItem('tasks'));
  }
}

function task(state0 = null, action) {
  switch(action.type) {
    case 'TASK':
      localStorage.setItem('task', JSON.stringify(action.data));
      return action.data;
    default:
      return JSON.parse(localStorage.getItem('task'));
  }
}

function session(state0 = null, action) {
  switch(action.type) {
    case 'NEW_SESSION':
      localStorage.setItem('session', JSON.stringify(action.data));
      return action.data;
    default:
      return JSON.parse(localStorage.getItem('session'));
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, task, session});
  let state1 = reducer(state0, action);
  deepFreeze(state1);
  return state1;
}

let store = createStore(root_reducer);
export default store;
