class AddLatLngToEventsModel < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :lat, :string
    add_column :events, :lng, :string
  end
end
