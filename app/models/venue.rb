class Venue < ApplicationRecord
    validates :name, presence: true
    validates :street, presence: true
    validates :city, presence: true
    validates :state, presence: true
    validates :zip, presence: true
    validates :telephone, presence: true
    validates :url, presence: true
end
