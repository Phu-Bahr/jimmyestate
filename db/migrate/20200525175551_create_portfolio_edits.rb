class CreatePortfolioEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_edits do |t|
      t.string :bannerImage
      t.string :headerText1
      t.string :headerText2

      t.timestamps
    end
  end
end
