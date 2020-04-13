class TrolleySerializer
  def initialize(trolley_object)
    @trolley = trolley_object
  end

  def to_serialized_json
    options = {
      include: {
        user: {
          only: [:username, :postcode, :email],
        },
      },
      except: [:created_at, :updated_at],
    }
    @trolley.to_json(options)
  end
end
