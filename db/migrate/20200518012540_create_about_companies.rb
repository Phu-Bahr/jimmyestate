class CreateAboutCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :about_companies do |t|
      t.string :content
      t.string :image
      t.string :headerText1
      t.string :headerText2

      t.timestamps
    end
  end
end
