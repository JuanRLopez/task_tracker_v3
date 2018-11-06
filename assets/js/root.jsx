import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import Login from './login';
import Header from './header';
import Task from './task';
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
    //this.fetch_users();
    api.create_session('jlopez', 'password');
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <TaskList />
          } />
          <Route path="/login" exact={true} render={() =>
            <Login />
          } />
          <Route path="/task/:id" exact={true} render={() =>
            <Task />
          } />
	  <Route path="/task/new" exact={true} render={() =>
            <NewTask />
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let {session} = props;
  let val = <p>something went wrong</p>;

  if (typeof session.username != 'undefined') {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark row">
      <Link to={"/"} onClick={() => api.fetch_taskss()} className="navbar-brand nav-text">Tasks</Link>
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
