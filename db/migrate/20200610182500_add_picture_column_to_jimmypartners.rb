class AddPictureColumnToJimmypartners < ActiveRecord::Migration[5.2]
  def change
    add_column :jimmy_partners, :image, :string
  end
end
