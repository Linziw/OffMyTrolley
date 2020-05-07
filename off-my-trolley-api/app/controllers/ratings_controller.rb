class RatingsController < ApplicationController

  def index
    allratings = []
    Rating.all.each do |object| 
      rating = {}
      rating[object.name] = object.stars
      allratings << rating
    end
    summed = allratings.inject{|a,b| a.merge(b){|_,x,y| x + y}}

    occurances = {}
    Rating.all.each do |object| 
      occurances[object.name] ||= 0
      occurances[object.name]+= 1
    end
    
    binding.pry
    
    averages = {}
    summed.each do |supermarket, sum| 
      averages[supermarket] = sum/occurances["supermarket"]
    end
    
   

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