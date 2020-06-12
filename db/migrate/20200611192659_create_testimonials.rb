class CreateTestimonials < ActiveRecord::Migration[5.2]
  def change
    create_table :testimonials do |t|
      t.string :image
      t.string :title
      t.string :description
      t.string :name

      t.timestamps
    end
  end
end
