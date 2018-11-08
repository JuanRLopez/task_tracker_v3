import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export default function NewTask(props) {
  return <div className="row">
    <div className="col-6">
      <div className="form">
        Title:
        <input type="text" name="title" id="title"/>
	      Description:
        <input type="text" name="desc" id="desc"/>
	      Time worked:
	      <input type="text" name="time_worked" id="time_worked"/>
	      Assigned to:
	      <input type="text" name="assigned_user" id="assigned_user"/>
	      Completed:
	      <input type="checkbox" name="completed" id="completed"/>
        <span><Link to={"/"} onClick={() => {api.create_task();api.fetch_tasks();}} className="btn btn-primary">Create</Link></span>
        <span><Link to={"/"} onClick={() => api.fetch_tasks()} className="btn btn-secondary">Back</Link></span>
      </div>
    </div>;
}

//export default connect((state) => {return state;})(NewTask);
