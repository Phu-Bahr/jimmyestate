class CreateHelperLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :helper_links do |t|
      t.string :image
      t.string :title
      t.string :route

      t.timestamps
    end
  end
end
