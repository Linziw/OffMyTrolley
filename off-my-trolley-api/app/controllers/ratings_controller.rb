class RatingsController < ApplicationController

  def create
    newrating = Rating.create(post_params)
    if newrating.persisted?
      render json: newrating
    end
  end

  private 
  def post_params
    params.require(:rating).permit(:name, :stars)
  end
    

end