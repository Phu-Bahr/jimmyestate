class Api::V1::CustomCardsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        custom_card = CustomCard.all
        render json: custom_card
    end

    def update
        custom_card = CustomCard.find(params[:id])
        if custom_card.update_attributes(custom_card_params)
            render json: custom_card
        else
            render json: custom_card.errors, status: :unprocessable_entity
        end
    end

    private
        def custom_card_params
            params.require(:custom_card).permit(:image, :title)
        end
end
