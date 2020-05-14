class RemoveFlierFromAnnouncements < ActiveRecord::Migration[5.2]
  def change
    remove_column :announcements, :flier, :string
  end
end
