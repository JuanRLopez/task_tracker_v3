import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import Login from './login';
import Register from './register';
import Task from './task';
import NewTask from './new_task';
import UpdateTask from './update_task';
import TaskList from './task_list';

import store from './store';

export default function root_init(node, store) {
  let action = {
    type: 'TASK_LIST',
    data: window.tasks,
  };
  store.dispatch(action);
  api.fetch_tasks();

  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    node
  );
}


function Root(props) {
  return <div>
    <Router>
      <div>
        <Route path="/" exact={true} render={() =>
	  store.getState().session ? (
            <div>
              <Header />
              <TaskList />
            </div>
          ) : (
	    <Redirect to="/login"/>
          )
        } />
        <Route path="/login" exact={true} render={() =>
          store.getState().session ? (
            <Redirect to="/"/>
	  ) : (
            <div>
              <Header />
              <Login />
            </div>
	  )
        } />
        <Route path="/register" exact={true} render={() =>
          store.getState().session ? (
            <Redirect to="/"/>
          ) : (
            <div>
              <Header />
              <Register />
            </div>
          )
        } />
        <Route path="/task/:id" exact={true} render={() =>
          store.getState().session ? (
            <div>
              <Header />
              <Task />
            </div>
          ) : (
            <Redirect to="/login"/>
          )
        } />
	<Route path="/new_task/" exact={true} render={() =>
          store.getState().session ? (
            <div>
              <Header />
              <NewTask />
            </div>
          ) : (
            <Redirect to="/login"/>
          )
        } />
        <Route path="/edit_task/:id" exact={true} render={() =>
          store.getState().session ? (
	    <div>
	      <Header />
              <UpdateTask />
	    </div>
          ) : (
            <Redirect to="/login"/>
          )
        } />
      </div>
    </Router>
  </div>;
}

function Header(props) {
  let state = store.getState();
  let session = state.session;
  if (session) {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
      <Link to={"/"} onClick={() => api.fetch_tasks()} className="navbar-brand nav-text">Tasks</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/new_task"} className="nav-text">New Task</Link>
        </li>
      </ul>

      <div className="ml-auto nav-text">
        <p className="nav-text">
	        {session.username} | 
          <Link to={"/login"} onClick={() => api.logout()} className="btn btn-warning">Logout</Link>
        </p>
      </div>
    </nav>;
  } else {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
        <Link to={"/login"} className="navbar-brand nav-text">Tasks</Link>
      </nav>;
  }
}
