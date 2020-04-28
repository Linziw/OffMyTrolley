class Trolley < ApplicationRecord
  belongs_to :user
  validates :date, presence: true
  validates :time, presence: true
  validates :supermarket, presence: true
  validates :space, presence: true
  validates :user_id, presence: true

end