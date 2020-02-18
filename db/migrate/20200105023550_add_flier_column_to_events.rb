class AddFlierColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :flier, :string
  end
end
