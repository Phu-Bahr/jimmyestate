class CreatePrivacyPolicies < ActiveRecord::Migration[5.2]
  def change
    create_table :privacy_policies do |t|
      t.string :content
      
      t.timestamps
    end
  end
end
