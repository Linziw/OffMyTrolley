class TrolleysController < ApplicationController
  def index
    trolleys = Trolley.all
    render json: TrolleySerializer.new(trolleys).to_serialized_json
  end
end
