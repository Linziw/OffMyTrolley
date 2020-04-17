class SessionsController < ApplicationController
  
  def new
    user = User.find_by_username(params[:username])
    if user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else 
      render json:{message: 'we couldnt verify you!'}
    end
  end

  
end