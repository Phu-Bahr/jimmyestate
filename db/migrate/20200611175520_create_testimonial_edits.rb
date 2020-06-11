class CreateTestimonialEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :testimonial_edits do |t|
      t.string :bannerImage
      t.string :headerText1
      t.string :headerText2

      t.timestamps
    end
  end
end
