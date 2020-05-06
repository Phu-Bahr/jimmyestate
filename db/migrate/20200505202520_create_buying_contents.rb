class CreateBuyingContents < ActiveRecord::Migration[5.2]
  def change
    create_table :buying_contents do |t|
      t.string :content

      t.timestamps
    end
  end
end
