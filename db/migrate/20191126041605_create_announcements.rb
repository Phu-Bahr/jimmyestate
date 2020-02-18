class CreateAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :announcements do |t|
      t.string :description
      t.string :flier

      t.timestamps
    end
  end
end
