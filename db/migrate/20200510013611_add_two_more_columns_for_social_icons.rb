class AddTwoMoreColumnsForSocialIcons < ActiveRecord::Migration[5.2]
  def change
    add_column :footers, :zillow, :string
    add_column :footers, :realtor, :string
  end
end
