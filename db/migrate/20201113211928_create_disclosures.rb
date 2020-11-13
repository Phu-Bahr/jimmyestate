class CreateDisclosures < ActiveRecord::Migration[5.2]
  def change
    create_table :disclosures do |t|
      t.string :content

      t.timestamps
    end
  end
end
