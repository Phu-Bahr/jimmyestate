class AddBannerimageColumnToAnnouncements < ActiveRecord::Migration[5.2]
  def change
    add_column :announcements, :bannerImage, :string
  end
end
