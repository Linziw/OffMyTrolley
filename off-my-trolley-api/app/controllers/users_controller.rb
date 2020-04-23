class UsersController < ApplicationController

  def create

    newuser = User.create(username: params[:username], password: params[:password], postcode: params[:postcode], email: params[:email], longitude: params[:longitude], latitude: params[:latitude])
    if newuser.persisted?
      render json: newuser
      session[:user_id]= newuser.id
    else
      render json:{message: 'the user didnt save!'}
    end
  end

end
