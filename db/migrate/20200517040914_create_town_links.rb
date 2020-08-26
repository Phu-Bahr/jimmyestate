class CreateTownLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :town_links do |t|
      t.string :townlink
      t.string :townlinkdescription
      t.belongs_to :town, null: false
      t.timestamps
    end
  end
end
