class Api::V1::HomeWorthsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def create
        @home_worth = HomeWorth.create!(home_worth_params)

        if @home_worth
            UserMailer.with(home_worth: @home_worth).home_worth.deliver_later
            render json: @home_worth
        else
            render json: @home_worth.errors
        end
    end

    private

    def home_worth_params
        params.require(:home_worth).permit( 
            :name,
            :email,
            :phone,
            :address,
            :message
        )
    end
    
end
