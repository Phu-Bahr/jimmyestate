class CreateMarketReportEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :market_report_edits do |t|
      t.string :bannerImage
      t.string :paragraph1
      t.string :paragraph2
      t.string :bannerText1
      t.string :bannerText2

      t.timestamps
    end
  end
end
