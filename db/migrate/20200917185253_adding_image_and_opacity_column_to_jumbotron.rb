class AddingImageAndOpacityColumnToJumbotron < ActiveRecord::Migration[5.2]
  def change
    add_column :jumbotrons, :image, :string
    add_column :jumbotrons, :opacity, :string
  end
end
