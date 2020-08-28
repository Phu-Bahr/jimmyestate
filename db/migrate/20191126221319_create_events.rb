class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.date :date
      t.string :location
      t.string :time
      t.string :flier
      t.string :lat
      t.string :lng

      t.timestamps
    end
  end
end
