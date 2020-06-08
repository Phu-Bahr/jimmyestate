class CreateMarketReportPhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :market_report_photos do |t|
      t.string :photo

      t.timestamps
    end
  end
end
