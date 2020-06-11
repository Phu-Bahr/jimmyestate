class Api::V1::MarketReportsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def create
        @market_report = MarketReport.create!(market_report_params)

        if @market_report
            UserMailer.with(market_report: @market_report).market_report.deliver_later
            render json: @market_report
        else
            render json: @market_report.errors
        end
    end

    private

    def market_report_params
        params.require(:market_report).permit( 
            :name,
            :email,
            :phone,
            :destinationaddress,
            :message
        )

    end
    
end
