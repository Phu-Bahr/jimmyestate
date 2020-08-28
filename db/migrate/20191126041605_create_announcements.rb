class CreateAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :announcements do |t|
      t.string :description
      t.string :title
      t.string :bannerImage

      t.timestamps
    end
  end
end
