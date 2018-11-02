defmodule TaskTrackerV3.Repo do
  use Ecto.Repo,
    otp_app: :task_tracker_v3,
    adapter: Ecto.Adapters.Postgres
end
