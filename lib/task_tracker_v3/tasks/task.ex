defmodule TaskTrackerV3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :desc, :string
    field :time_worked, :integer
    field :title, :string
    belongs_to :user, TaskTrackerV3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time_worked, :completed, :user_id])
    |> validate_required([:title, :desc, :time_worked, :completed, :user_id])
    |> validate_inclusion(:time_worked, Enum.map(0..1000000, fn i -> i * 15 end),
                          message: "time worked has to be in 15 minute intervals")
  end
end
