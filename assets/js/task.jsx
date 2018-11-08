import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

function Task(props) {
  //let task = api.fetch_task(props.match.params.id);
  let {task} = props;
  return <div className="row">
    <div className="col-6">
      <h1>{task.name}</h1>
      <div className="card">
        <div className="card-body">
          <p>
            {task.desc}
          </p>
        </div>
      </div>
      <p>
        Assigned to: {task.user.username} | Completed: {task.Completed} | Time Worked: {task.time_worked}
      </p>
      <span><Link to={"/task/edit/" + task.id} onClick={() => api.fetch_task(props.match.params.id)} className="btn btn-primary">Edit</Link></span>
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
