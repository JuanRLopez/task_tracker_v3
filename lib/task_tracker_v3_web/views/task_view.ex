defmodule TaskTrackerV3Web.TaskView do
  use TaskTrackerV3Web, :view
  alias TaskTrackerV3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    user = TaskTrackerV3Web.UserView.render("user.json", %{user: task.user})

    %{id: task.id,
      title: task.title,
      desc: task.desc,
      time_worked: task.time_worked,
      completed: task.completed,
      user: user}
  end
end
