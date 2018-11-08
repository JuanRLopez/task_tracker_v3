import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

function UpdateTask(props) {
  let {task} = props;
  return <div className="row">
    <div className="col-6">
      <div className="form">
        Title:
        <input type="text" name="title" id="title" value={task.title}/>
	      Description:
        <input type="text" name="desc" id="desc" value={task.desc}/>
	      Time worked:
	      <input type="text" name="time_worked" id="time_worked" value={task.time_worked}/>
	      Assigned to:
	      <input type="text" name="assigned_user" id="assigned_user" value={task.user.username}/>
	      Completed:
	      <input type="checkbox" name="completed" id="completed" value={task.completed}/>
        <span><Link to={"/task/" + task.id} onClick={() => api.update_task(task.id)} className="btn btn-primary">Update</Link></span>
        <span><Link to={"/"} onClick={() => api.fetch_task(task.id)} className="btn btn-secondary">Back</Link></span>
      </div>
    </div>;
}

export default connect(({task}) => ({task}))(UpdateTask);
