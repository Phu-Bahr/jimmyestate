class DropTowns < ActiveRecord::Migration[5.2]
  def change
    drop_table :towns
  end
end
