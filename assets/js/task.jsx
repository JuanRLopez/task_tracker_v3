import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function Task(props) {
  //let prods = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
  let task = _.find(props.tasks, (task) => task.id == props.params.id); //TODO: somehow get the param id
  return <div className="row">
    <div className="col-6">
      <h1>{task.name}</h1>
        <p>
          Assigned to: {task.user.username} | Completed: {task.Completed} | Time Worked: {task.time_worked}
        </p>
        //TODO: add buttons {edit, back}
    </div>
  </div>;
}

export default connect(({task}) => ({task}))(Task);
