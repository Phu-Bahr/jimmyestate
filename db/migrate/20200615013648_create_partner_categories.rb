class CreatePartnerCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :partner_categories do |t|
      t.string :name
      t.string :headerText1
      t.string :headerText2
      t.string :content
      t.string :bannerImage

      t.timestamps
    end
  end
end
