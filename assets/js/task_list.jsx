import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

function TaskList(props) {
  let prods = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
  return <div className="row">
    <div className="col-12">
      {prods}
    </div>
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="row">
    <div className="col-2"></div>
    <div className="col-8">
      <div className="card">
        <div className="card-body">
          <div className="task-info">
            <h3 className="card-title">
              <Link to={"/task/" + task.id} onClick={() => api.fetch_task(task.id)}>
                {task.title}
              </Link>
            </h3>
            <p className="card-text">
              <b>Assigned to:</b> {task.user.username} | <b>Completed:</b> {task.completed ? "yes" : "no"}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="col-2"></div>
  </div>;
}

export default connect(({tasks}) => ({tasks}))(TaskList);
