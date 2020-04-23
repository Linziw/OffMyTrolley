class SessionsController < ApplicationController
  
  def new
    user = User.find_by_username(params[:username])
    if user
      user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    end
  end

  
end