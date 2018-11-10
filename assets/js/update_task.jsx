import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

function UpdateTask(props) {
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
    <div className="col-6">
      <h1>Update {task.title}</h1>
      <div className="form">
        Title:
        <input type="text" name="title" id="title" className="form-control" defaultValue={task.title}/>
	Description:
        <input type="text" name="desc" id="desc" className="form-control" defaultValue={task.desc}/>
	Time worked:
	<input type="text" name="time_worked" id="time_worked" className="form-control" defaultValue={task.time_worked}/>
	Assigned to (username):
	<input type="text" name="assigned_user" id="assigned_user" className="form-control" defaultValue={task.user.username}/>
	Completed:
	<input type="checkbox" name="completed" id="completed" className="form-control" defaultChecked={task.completed}/>
        <span><Link to={"/task/" + task.id} onClick={() => {api.update_task(task.id);api.fetch_task(task.id);api.fetch_tasks();}} className="btn btn-primary">Update</Link></span>
        <span><Link to={"/task/" + task.id} onClick={() => api.fetch_task(task.id)} className="btn btn-secondary">Back</Link></span>
      </div>
    </div>
  </div>;
}

export default connect(({task}) => ({task}))(UpdateTask);
