class User < ApplicationRecord
  has_many :trolleys
  has_secure_password
end
