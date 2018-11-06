import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function NewTask(props) {
  return <div className="row">
    <div className="col-6">
      <div className="form">
        Title:
        <input type="text" name="title" />
	Description:
        <input type="text" name="desc" />
	Time worked:
	<input type="text" name="time_worked" />
	Assigned to:
	<input type="text" name="username" />
	Completed:
	<input type="checkbox" name="completed" />
        <button className="btn btn-secondary" onClick={() => api.create_task(????????????)}>Register</button>
      </div>
    </div>;
}

export default connect((state) => {return state;})(NewTask);
