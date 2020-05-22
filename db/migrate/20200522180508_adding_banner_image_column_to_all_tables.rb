class AddingBannerImageColumnToAllTables < ActiveRecord::Migration[5.2]
  def change
    add_column :venues, :bannerImage, :string
    add_column :towns, :bannerImage, :string
    add_column :buying_contents, :bannerImage, :string
    add_column :selling_contents, :bannerImage, :string
    add_column :worth_edits, :bannerImage, :string
    add_column :relocation_edits, :bannerImage, :string
    add_column :abouts, :bannerImage, :string
    add_column :portfolios, :bannerImage, :string
    add_column :about_companies, :bannerImage, :string
    add_column :jimmy_tips, :bannerImage, :string
    add_column :contacts, :bannerImage, :string
  end
end
