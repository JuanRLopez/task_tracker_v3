import store from './store';

class TheServer {
  fetch(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_tasks() {
    fetch(
      "/api/v1/tasks",
      (resp) => {
	store.dispatch({
	  type: 'TASK_LIST',
	  data: resp.data
	});
      }
    );
  }

  fetch_task(id) {
    fetch(
      "/api/v1/tasks/" + id,
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
      }
    );
  }

  fetch_users() {
    fetch(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data
        });
      }
    );
  }

  post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  put(path, data, callback) {
    $.ajax(path, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  del(path, callback) {
    $.ajax(path, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  create_session(username, password) {
    post(
      "/api/v1/sessions",
      {username, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data
        });
      }
    );
  }

  // TODO: right?
  logout() {
    del(
      "/api/v1/sessions",
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data
        });
      }
    );
  }

  create_task(title, desc, time_worked, completed, assigned_user) {
    post(
      "/api/v1/tasks",
      {title, desc, time_worked, completed, assigned_user},
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
      }
    );
  }

  create_user(username, password) {
    post(
      "/api/v1/users",
      {username, password},
      (resp) => {
        console.log("created user:");
	console.log(resp.data);
      }
    );
  }

  delete_task(task_id) {
    del(
      "/api/v1/tasks/" + task_id,
      (resp) => {
        console.log("deleted");
      }
    );
  }

  update_task(task_id, title, desc, time_worked, completed, assigned_user) {
    put(
      "/api/v1/tasks/" + task_id,
      {task_id, title, desc, time_worked, completed, assigned_user},
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
      }
    );
  }
}
