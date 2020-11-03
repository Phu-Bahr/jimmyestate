class AddingTimeEnd < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :timeEnd, :string
  end
end
