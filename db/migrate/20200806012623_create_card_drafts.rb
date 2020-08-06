class CreateCardDrafts < ActiveRecord::Migration[5.2]
  def change
    create_table :card_drafts do |t|
      t.string :content
      
      t.timestamps
    end
  end
end
