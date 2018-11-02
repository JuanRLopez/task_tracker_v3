import React from 'react';
import _ from 'lodash';

export default function Task(props) {
  //let prods = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
  let task = _.find(props.tasks, (task) => task.id == props.params.id); //TODO: somehow get the param id
  return <div className="card col-12">
    <div className="row">
      <div className="col-6">
          <h1>{task.name}</h1>
          <p>
            Assigned to: {task.user.username} | Completed: {task.Completed} | Time Worked: {task.time_worked}
          </p>
          //TODO: add buttons {edit, back}
      </div>
    </div>
  </div>;
}
