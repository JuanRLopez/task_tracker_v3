defmodule TaskTrackerV3Web.SessionController do
  use TaskTrackerV3Web, :controller

  alias TaskTrackerV3.Users.User

  def create(conn, %{"username" => username, "password" => password}) do
    with %User{} = user <- TaskTrackerV3.Users.get_and_auth_user(username, pass) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTrackerV3Web.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
