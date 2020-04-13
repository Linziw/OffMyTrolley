class TrolleysController < ApplicationController
  def index
    trolleys = Trolley.all
    render json: TrolleySerializer.new(trolleys).to_serialized_json
  end

  def show
    trolley = Trolley.find_by(id: params[:id])
    render json: TrolleySerializer.new(trolley).to_serialized_json
  end
end
