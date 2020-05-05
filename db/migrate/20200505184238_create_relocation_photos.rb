class CreateRelocationPhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :relocation_photos do |t|
      t.string :photo

      t.timestamps
    end
  end
end
