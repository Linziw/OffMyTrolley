class UsersController < ApplicationController

  def create
    newuser = User.create(username: params[:username], password: params[:password], postcode: params[:postcode], email: params[:email])
  end

end
