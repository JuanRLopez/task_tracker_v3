import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export default function NewTask(props) {
  return <div className="row">
    <div className="col-6">
      <h1>New Task</h1>
      <div className="form">
        Title:
        <input type="text" name="title" id="title" className="form-control"/>
	Description:
        <input type="text" name="desc" id="desc" className="form-control"/>
	Time worked:
	<input type="text" name="time_worked" id="time_worked" className="form-control"/>
	Assigned to (username):
	<input type="text" name="assigned_user" id="assigned_user" className="form-control"/>
	Completed:
	<input type="checkbox" name="completed" id="completed" className="form-control"/>
        <span><Link to={"/"} onClick={() => {api.create_task();api.fetch_tasks();}} className="btn btn-primary">Create</Link></span>
        <span><Link to={"/"} onClick={() => api.fetch_tasks()} className="btn btn-secondary">Back</Link></span>
      </div>
    </div>
  </div>;
}

