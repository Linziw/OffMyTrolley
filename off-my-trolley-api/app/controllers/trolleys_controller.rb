class TrolleysController < ApplicationController
  def index
    trolleys = Trolley.all
    futuretrolleys = trolleys.to_ary.select {|trolley| trolley.date > Date.today}
    render json: TrolleySerializer.new(futuretrolleys).to_serialized_json
  end

  def create
    newtrolley = Trolley.create(post_params)
    if newtrolley.persisted?
      render json: TrolleySerializer.new(newtrolley).to_serialized_json
    end
  end

  def destroy
    trolley = Trolley.find_by(id: params[:id])
    trolley.destroy
    render json:{message: 'the trolley has been destroyed!'}
  end

  private 
def post_params
  params.require(:trolley).permit(:date, :time, :supermarket, :space, :user_id)
end
end
