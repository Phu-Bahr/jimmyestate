class CreateVenueTemplates < ActiveRecord::Migration[5.2]
  def change
    create_table :venue_templates do |t|
      t.string :bannerImage
      t.string :headerText1
      t.string :headerText2
      t.string :content
      t.string :image

      t.timestamps
    end
  end
end
