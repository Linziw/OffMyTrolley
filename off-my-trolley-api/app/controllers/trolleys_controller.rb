class TrolleysController < ApplicationController
  def index
    trolleys = Trolley.all
    render json: TrolleySerializer.new(trolleys).to_serialized_json
  end

  def show
    trolley = Trolley.find_by(id: params[:id])
    render json: TrolleySerializer.new(trolley).to_serialized_json
  end

  def create
    newtrolley = Trolley.create(user_id: params[:user_id], date: params[:date], time: params[:time], supermarket: params[:supermarket], space: params[:space])
    if newtrolley.persisted?
      render json: newtrolley
    else
      render json:{message: 'the trolley didnt save!'}
    end
  end
end
