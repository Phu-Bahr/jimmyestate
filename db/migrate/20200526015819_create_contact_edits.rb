class CreateContactEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :contact_edits do |t|
      t.string :bannerImage
      t.string :headerText1
      t.string :headerText2
      t.string :name
      t.string :address
      t.string :phonenumber
      t.string :email
      t.string :lat
      t.string :lng

      t.timestamps
    end
  end
end
