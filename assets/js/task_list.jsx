import React from 'react';
import { connect } from 'react-redux';
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
          <h2 className="card-title">{task.name}</h2>
          <p className="card-text">
            Assigned to: {task.user.username} | Completed: {task.Completed}
          </p>
        </div>
      </div>
    </div>
    <div className="col-2"></div>
  </div>;
}

export default connect((state) => {return {tasks: state.tasks};})(TaskList);
