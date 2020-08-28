class CreateFooters < ActiveRecord::Migration[5.2]
  def change
    create_table :footers do |t|
      t.string :name
      t.string :street
      t.string :citystate
      t.string :contact1
      t.string :contact2
      t.string :contact3
      t.string :contact4
      t.string :facebook
      t.string :twitter
      t.string :instagram
      t.string :other
      t.string :zillow
      t.string :realtor

      t.timestamps
    end
  end
end
