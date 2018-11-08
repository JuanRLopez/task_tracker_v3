//
// TODO: redirect
//
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

  del(path, data, callback) {
    $.ajax(path, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
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

  create_task() {
    let state = store.getState();
    let token = state.session.token;
    let title = $("#title").val();
    let desc = $("#desc").val();
    let assigned_user = $("#assigned_user").val();
    let time_worked = $("#time_worked").val();
    let completed = $("#completed").val();
    post(
      "/api/v1/tasks",
      {task: {title, desc, time_worked, completed, assigned_user}, token: token},
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
        // TODO: redirect
      }
    );
  }

  delete_task(task_id) {
    let state = store.getState();
    let token = state.session.token;
    del(
      "/api/v1/tasks/" + task_id,
      {token},
      (resp) => {
        this.fetch_tasks();
        // TODO: redirect
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
    let completed = $("#completed").val();
    put(
      "/api/v1/tasks/" + task_id,
      {task: {task_id, title, desc, time_worked, completed, assigned_user}, token: token},
      (resp) => {
        store.dispatch({
          type: 'TASK',
          data: resp.data
        });
        // TODO: redirect
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

  create_user(username, password) {
    post(
      "/api/v1/users",
      {user: {username, password}},
      (resp) => {
        console.log("created user:");
        console.log(resp.data);
      }
    );
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
        // redirect to "/"
      }
    );
  }

  logout() {
    // NOTE: not really an api call.
    store.dispatch({
      type: 'NEW_SESSION',
      data: null
    });
    /*
    let state = store.getState();
    let token = state.session.token;
    del(
      "/api/v1/sessions",
      {token},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: null
        });
      }
    );
    */
  }
}
