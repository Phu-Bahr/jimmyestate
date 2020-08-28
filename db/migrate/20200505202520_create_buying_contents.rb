class CreateBuyingContents < ActiveRecord::Migration[5.2]
  def change
    create_table :buying_contents do |t|
      t.string :bannerImage
      t.string :content
      t.string :headerText1
      t.string :headerText2

      t.timestamps
    end
  end
end
