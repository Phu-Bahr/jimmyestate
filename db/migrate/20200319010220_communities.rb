class Communities < ActiveRecord::Migration[5.2]
  def change
    create_table :communities do |t|
      t.string :headerText1
      t.string :headerText2
      t.string :paragraph1
      t.string :paragraph2
      t.string :paragraph3
      t.string :paragraph4
      t.string :paragraph5
      t.string :townheader
      t.string :townlink1
      t.string :townlink2
      t.string :townlink3

      t.timestamps
    end
  end
end
