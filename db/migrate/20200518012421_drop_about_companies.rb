class DropAboutCompanies < ActiveRecord::Migration[5.2]
  def change
    drop_table :about_companies
  end
end
