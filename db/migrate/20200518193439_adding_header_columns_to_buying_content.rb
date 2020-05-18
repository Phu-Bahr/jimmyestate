class AddingHeaderColumnsToBuyingContent < ActiveRecord::Migration[5.2]
  def change
    add_column :buying_contents, :headerText1, :string
    add_column :buying_contents, :headerText2, :string
  end
end
