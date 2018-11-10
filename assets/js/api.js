import store from './store';
import history from './history';
import Root from './root';

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

  post(path, data, callback, error) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
      error: error,
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

  fetch_tasks() {
    this.fetch(
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
    this.fetch(
      "/api/v1/tasks/" + id,
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
      }
    );
  }

  create_task() {
    let state = store.getState();
    let token = state.session.token;
    let title = $("#title").val();
    let desc = $("#desc").val();
    let assigned_user = $("#assigned_user").val();
    let time_worked = $("#time_worked").val();
    let completed = $("#completed").prop('checked');
    this.post(
      "/api/v1/tasks",
      {task: {title, desc, time_worked, completed, assigned_user}, token: token},
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
        this.fetch_tasks();
      },
      (xhr, ajaxOptions, thrownError) => {
        console.log("failed to create task");
      }
    );
  }

  delete_task(task_id) {
    let state = store.getState();
    let token = state.session.token;
    this.del(
      "/api/v1/tasks/" + task_id + "?token=" + token,
      (resp) => {
        this.fetch_tasks();
      }
    );
  }

  update_task(task_id) {
    let state = store.getState();
    let token = state.session.token;
    let title = $("#title").val();
    let desc = $("#desc").val();
    let assigned_user = $("#assigned_user").val();
    let time_worked = $("#time_worked").val();
    let completed = $("#completed").prop('checked');
    this.put(
      "/api/v1/tasks/" + task_id,
      {task: {task_id, title, desc, time_worked, completed, assigned_user}, token: token},
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
      }
    );
  }

  create_user(username, password) {
    this.post(
      "/api/v1/users",
      {user: {username, password}},
      (resp) => {
        console.log("created user");
      },
      (xhr, ajaxOptions, thrownError) => {
        console.log("failed to create user");
      }
    );
  }

  create_session(username, password) {
    this.post(
      "/api/v1/sessions",
      {username, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data
        });
        history.push('/');
	location.reload();
	Root.forceUpdate();
      },
      (xhr, ajaxOptions, thrownError) => {
	$('#login-alert').show();
      }
    );
  }

  logout() {
    store.dispatch({
      type: 'NEW_SESSION',
      data: null
    });
    store.dispatch({
      type: 'TASK_LIST',
      data: []
    });
    store.dispatch({
      type: 'TASK',
      data: null
    });
  }
}

export default new TheServer();
