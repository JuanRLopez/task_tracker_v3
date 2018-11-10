import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

function Task(props) {
  let {task} = props;
  if(!task) {
    task = {
      id: -1,
      title: "loading...",
      desc: "",
      completed: false,
      time_worked: 0,
      user: {
        username: "",
      },
    }
  }
  return <div className="row">
    <div className="col-12">
      <h1>{task.title}</h1>
      <div className="card">
        <div className="card-body">
          <p>
            {task.desc}
          </p>
        </div>
      </div>
      <p>
        <b>Assigned to:</b> {task.user.username} | <b>Completed:</b> {task.completed ? "yes" : "no"} | <b>Time Worked:</b> {task.time_worked}
      </p>
      <span><Link to={"/edit_task/" + task.id} onClick={() => api.fetch_task(task.id)} className="btn btn-primary">Edit</Link></span>
      <span><Link to={"/"} onClick={() => api.fetch_tasks()} className="btn btn-secondary">Back</Link></span>
      <span className="delete-btn">
        <Link to={"/"} onClick={() => {api.delete_task(task.id);api.fetch_tasks();}} className="btn btn-danger">
          Delete
        </Link>
      </span>
    </div>
  </div>;
}

export default connect(({task}) => ({task}))(Task);
