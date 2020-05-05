class CreateRelocations < ActiveRecord::Migration[5.2]
  def change
    create_table :relocations do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :time
      t.string :destinationaddress
      t.string :timeframe
      t.string :assistsell
      t.string :message

      t.timestamps
    end
  end
end
