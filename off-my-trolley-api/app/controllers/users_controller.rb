class UsersController < ApplicationController

  def create
    newuser = User.create(username: params[:username], password: params[:password], postcode: params[:postcode], email: params[:email])
    if newuser.persisted?
      render json: newuser
      session[:id]= newuser.id
    else
      render json:{message: 'the user didnt save!'}
    end
  end

end
