class RemoveBannertTextFromPortfolios < ActiveRecord::Migration[5.2]
  def change
    remove_column :portfolios, :bannerText, :string
  end
end
