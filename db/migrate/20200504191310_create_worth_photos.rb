class CreateWorthPhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :worth_photos do |t|
      t.string :photo
      t.timestamps
    end
  end
end
