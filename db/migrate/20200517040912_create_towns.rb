class CreateTowns < ActiveRecord::Migration[5.2]
  def change
    create_table :towns do |t|
      t.string :name
      t.string :headerText1
      t.string :headerText2
      t.string :townheader
      t.string :content

      t.timestamps
    end
  end
end