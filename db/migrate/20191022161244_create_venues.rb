class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues do |t|
      t.string :name, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.string :telephone, null: false
      t.string :url, null: false
      t.string :venue_image, default: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwipzcXPktHlAhXrQ98KHSdKCeQQjRx6BAgBEAQ&url=https%3A%2F%2Fvollrath.com%2FProducts%2FSmallwares%2FBuffet-Tabletop-Service%2FKondi-Keeper-Replacement-Lids&psig=AOvVaw0LqwqgCNgtGbIq8mXXbpiH&ust=1572977005119341'
      t.string :bannerImage
      t.timestamps
    end
  end
end
