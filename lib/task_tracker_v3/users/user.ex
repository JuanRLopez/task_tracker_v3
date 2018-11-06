defmodule TaskTrackerV3.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :password_hash, :string
    field :username, :string

    has_many :tasks, TaskTrackerV3.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password_hash])
    |> unique_constraint(:username)
    |> validate_required([:username, :password_hash])
  end
end
