class RemoveColumnsFromHomeworthMarketreports < ActiveRecord::Migration[5.2]
  def change
    remove_column :home_worths, :time, :string
    remove_column :home_worths, :squarefootage, :string
    remove_column :home_worths, :numberbedrooms, :string
    remove_column :home_worths, :numberbathrooms, :string
    remove_column :home_worths, :propertytype, :string
    remove_column :home_worths, :addfeatures, :string
    remove_column :market_reports, :time, :string
    remove_column :market_reports, :timeframe, :string
    remove_column :market_reports, :assistsell, :string
  end
end
