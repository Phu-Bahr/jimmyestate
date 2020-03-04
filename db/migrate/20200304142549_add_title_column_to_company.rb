class AddTitleColumnToCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :title, :string
  end
end
