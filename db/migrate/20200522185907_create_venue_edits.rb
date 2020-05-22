class CreateVenueEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :venue_edits do |t|
      t.string :bannerImage
      t.timestamps
    end
  end
end
