class RatingsController < ApplicationController

  def index
    #allratings = []
    #Rating.all.each do |object| 
     # rating = {}
     # binding.pry
     # rating[:name] = object.name
      #allratings << rating
    #end
    #allratings.inject{|a,b| a.merge(b){|_,x,y| x + y}}
    render json:{ Sainsburys: 4, Tesco: 3, Iceland: 2, Morrisons: 1, Lidl: 2, Aldi: 5 }
  end

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