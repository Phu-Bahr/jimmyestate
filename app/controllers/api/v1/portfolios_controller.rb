class Api::V1::PortfoliosController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        portfolio = Portfolio.all
        render json: portfolio
    end

    def create
        portfolio = Portfolio.create!(portfolio_params)
        if portfolio
            render json: portfolio
        else 
            render json: portfolio.errors
        end
    end

    def update
        portfolio = Portfolio.find(params[:id])
        if portfolio.update_attributes(portfolio_params)
            render json: portfolio
        else
            render json: portfolio.errors, status: :unprocessable_entity
        end
    end

    def destroy
        portfolio&.destroy
        render json: { message: 'portfolio deleted'}
    end

    private

    def portfolio_params
        params.require(:portfolio).permit( 
            :bannerText, 
            :photo, 
            :price, 
            :streetnumber, 
            :street, 
            :aptnumber, 
            :city, 
            :state, 
            :zip, 
            :status
        )
    end

    def portfolio
        @portfolio ||= Portfolio.find(params[:id])
    end
    
end
