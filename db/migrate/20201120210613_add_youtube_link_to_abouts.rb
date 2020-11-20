class AddYoutubeLinkToAbouts < ActiveRecord::Migration[5.2]
  def change
    add_column :abouts, :youtube, :string
  end
end
