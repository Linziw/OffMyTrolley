class Trolley < ApplicationRecord
  belongs_to :user
  validates :date, presence: true
  validates :time, presence: true
  validates :supermarket, presence: true
  validates :space, presence: true
  validates :user_id, presence: true
  validate :date_must_be_in_future
  
    def date_must_be_in_future
      if date <= Date.today
        errors.add(:date, "date must be in the future")
      end
    end    
  

end