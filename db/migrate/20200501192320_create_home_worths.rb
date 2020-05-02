class CreateHomeWorths < ActiveRecord::Migration[5.2]
  def change
    create_table :home_worths do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :time
      t.string :address
      t.string :squarefootage
      t.string :numberbedrooms
      t.string :numberbathrooms
      t.string :propertytype
      t.string :addfeatures
      t.string :message
      t.timestamps
    end
  end
end
