class CreateCustomCards < ActiveRecord::Migration[5.2]
  def change
    create_table :custom_cards do |t|
      t.string :title
      t.string :image
      
      t.timestamps
    end
  end
end
