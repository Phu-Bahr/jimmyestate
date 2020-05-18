class AddingHeadersColumnToSellingcontent < ActiveRecord::Migration[5.2]
  def change
    add_column :selling_contents, :headerText1, :string
    add_column :selling_contents, :headerText2, :string
  end
end
