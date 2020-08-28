class CreateTowns < ActiveRecord::Migration[5.2]
  def change
    create_table :towns do |t|
      t.string :bannerImage
      t.string :name
      t.string :headerText1
      t.string :headerText2
      t.string :townheader
      t.string :content
      t.string :townlinkdescription1
      t.string :townlinkdescription2
      t.string :townlinkdescription3

      t.timestamps
    end
  end
end