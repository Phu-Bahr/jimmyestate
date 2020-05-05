class Api::V1::RelocationsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def create
        @relocation = Relocation.create!(relocation_params)

        if @relocation
            UserMailer.with(relocation: @relocation).relocation.deliver_later
            render json: @relocation
        else
            render json: @relocation.errors
        end
    end

    private

    def relocation_params
        params.require(:relocation).permit( 
            :name,
            :email,
            :phone,
            :time,
            :destinationaddress,
            :timeframe,
            :assistsell,
            :message
        )

    end
    
end
