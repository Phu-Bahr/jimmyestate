class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.string :bannerImage
      t.string :photo
      t.integer :price
      t.string :streetnumber
      t.string :street
      t.string :aptnumber
      t.string :city
      t.string :state
      t.string :zip
      t.string :status
      
      t.timestamps
    end
  end
end
