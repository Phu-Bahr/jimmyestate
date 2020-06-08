class Api::V1::MarketReportEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        market_report_edit = MarketReportEdit.all
        render json: market_report_edit
    end

    def update
        market_report_edit = MarketReportEdit.find(params[:id])
        if market_report_edit.update_attributes(market_report_edit_params)
            render json: market_report_edit
        else
            render json: market_report_edit.errors, status: :unprocessable_entity
        end
    end

    private
        def market_report_edit_params
            params.require(:market_report_edit).permit(:bannerText1, :bannerText2, :paragraph1, :paragraph2, :bannerImage)
        end
end