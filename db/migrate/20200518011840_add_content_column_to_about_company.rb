class AddContentColumnToAboutCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :about_companies, :content, :string
  end
end
