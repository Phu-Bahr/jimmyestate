class Api::V1::MarketReportPhotosController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      market_report_photo = MarketReportPhoto.all
      render json: market_report_photo
    end

    def create
      market_report_photo = MarketReportPhoto.create!(market_report_photo_params)
      if market_report_photo
        render json: market_report_photo
      else
        render json: market_report_photo.errors
      end
    end

    def destroy
      market_report_photo&.destroy
      render json: { message: 'market_report_photo deleted'}
    end

    private

    def market_report_photo_params
      params.require(:market_report_photo).permit(:photo)
    end

    def market_report_photo
      @market_report_photo ||= MarketReportPhoto.find(params[:id])
    end

end