class CreateJimmyPartners < ActiveRecord::Migration[5.2]
  def change
    create_table :jimmy_partners do |t|
      t.string :bannerImage
      t.string :headerText1
      t.string :headerText2
      t.string :content

      t.timestamps
    end
  end
end
