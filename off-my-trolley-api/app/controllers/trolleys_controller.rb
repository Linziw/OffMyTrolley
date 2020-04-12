class TrolleysController < ApplicationController
  def index
    trolleys = Trolley.all
    render json: trolleys, include: [:user]
  end
end
