class AddTownlinkDescriptionColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :towns, :townlinkdescription1, :string
    add_column :towns, :townlinkdescription2, :string
    add_column :towns, :townlinkdescription3, :string
  end
end
