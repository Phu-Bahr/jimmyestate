class CreateJumbotrons < ActiveRecord::Migration[5.2]
  def change
    create_table :jumbotrons do |t|
      t.string :line1
      t.string :line2
      t.string :line3

      t.timestamps
    end
  end
end
