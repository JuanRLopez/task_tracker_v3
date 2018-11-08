import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import Login from './login';
import Register from './register';
import Header from './header';
import Task from './task';
import NewTask from './new_task';
import TaskList from './task_list';

export default function root_init(node, store) {
  let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
    };

    api.fetch_tasks();
    api.create_session('jlopez', 'password');
  }

  requireLogin(nextState, replace) {
    let state = store.getState();
    if (!state.session) {
      replace({
        pathname: '/login'
      })
    }
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} onEnter={requireLogin} render={() =>
            <TaskList />
          } />
          <Route path="/login" exact={true} render={() =>
            <Login />
          } />
          <Route path="/register" exact={true} render={() =>
            <Register />
          } />
          // TODO: what??????????????????????????????
          <Route path="/task/:id" exact={true} onEnter={requireLogin} render={() =>
            <Task />
          } />
	        <Route path="/task/new" exact={true} onEnter={requireLogin} render={() =>
            <NewTask />
          } />
          <Route path="/task/edit/:id" exact={true} onEnter={requireLogin} render={() =>
            <EditTask />
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let {session} = props;
  if (!session) {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
      <Link to={"/"} onClick={() => api.fetch_tasks()} className="navbar-brand nav-text">Tasks</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={"/task/new"} className="nav-text">New Task</Link>
        </li>
      </ul>

      <div className="ml-auto nav-text">
        <p className="nav-text">
	        {session.username} |
          <Link to={"/login"} onClick={() => api.logout()} classNme="btn btn-warning">Logout</Link>
	      </p>
      </div>
    </nav>;
  } else {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
        <Link to={"/login"} className="navbar-brand nav-text">Tasks</Link>
      </nav>;
  }

  /*
  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
    <%= if @current_user do %>
      <Link to={"/"} onClick={() => api.fetch_taskss()} className="navbar-brand nav-text">Tasks</Link>
    <% else %>
      <Link to={"/login"} className="navbar-brand nav-text">Tasks</Link>
    <% end %>

    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to={"/task/new"} className="nav-text">New Task</Link>
      </li>
    </ul>

    <div className="ml-auto nav-text">
      <%= if @current_user do %>
        <%= @current_user.username %> |
        <Link to={"/login"} onClick={() => api.logout()} classNme="btn btn-warning">Logout</Link>
      <% end %>
    </div>
  </nav>;
  */
}
