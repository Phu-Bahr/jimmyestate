class CreateAbouts < ActiveRecord::Migration[5.2]
  def change
    create_table :abouts do |t|
      t.string :bannerText1
      t.string :bannerText2
      t.string :paragraph1
      t.string :paragraph2
      t.string :paragraph3
      t.string :paragraph4
      t.string :paragraph5
      t.string :paragraph6
      t.string :paragraph7
      t.string :paragraph8
      t.string :photo
      t.string :photoname
      t.string :photonumber
      t.string :photoemail
      t.string :photoaddress1
      t.string :photoaddress2

      t.timestamps
    end
  end
end
