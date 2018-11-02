import React from 'react';

export default function TaskList(props) {
  let prods = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
  return <div>
    {prods}
  </div>;
}

function Task(props) {
  let {task} = props;
  return <div className="card col-12">
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8">
        <div className="card-body">
          <h2 className="card-title">{task.name}</h2>
          <p className="card-text">
            Assigned to: {task.user.username} | Completed: {task.Completed}
          </p>
        </div>
      </div>
      <div className="col-2"></div>
    </div>
  </div>;
}
