defmodule TaskTrackerV3Web.TaskController do
  use TaskTrackerV3Web, :controller

  alias TaskTrackerV3.Tasks
  alias TaskTrackerV3.Tasks.Task

  action_fallback TaskTrackerV3Web.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token}) do
    IO.puts("\n[in create]\n#{inspect(task_params)}\n#{inspect(token)}\n")
    {:ok, user_id} = Phoenix.Token.verify(TaskTrackerV3Web.Endpoint, "user_id", token, max_age: 86400)
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      task = Tasks.get_task!(task.id)
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "token" => token}) do
    task = Tasks.get_task!(id)
    {:ok, user_id} = Phoenix.Token.verify(TaskTrackerV3Web.Endpoint, "user_id", token, max_age: 86400)
    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    task = Tasks.get_task!(id)
    {:ok, user_id} = Phoenix.Token.verify(TaskTrackerV3Web.Endpoint, "user_id", token, max_age: 86400)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
