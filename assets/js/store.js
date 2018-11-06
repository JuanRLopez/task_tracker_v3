import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function tasks(state = [], action) {
  switch(action.type) {
    case 'TASK_LIST':
      return action.data;
    default:
      return state;
  }
}

function task(state = null, action) {
  switch(action.type) {
    case 'CREATE_TASK':
      //TODO: do something
    case 'UPDATE_TASK':
      //TODO: do something
    case 'DELETE_TASK':
      //TODO: do something
    default:
      return state;
  }
}

function users(state = [], action) {
  switch(action.type) {
    case 'USER_LIST':
      return action.data;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch(action.type) {
    case 'CREATE_USER':
      //TODO: do something
    default:
      return state;
  }
}

function session(state = null, action) {
  switch(action.type) {
    case 'NEW_SESSION':
      return action.data;
    case 'LOGOUT':
      //TODO: do something
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, task, users, user, session});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
