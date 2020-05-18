class Api::V1::BuyingContentsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        buying_content = BuyingContent.all
        render json: buying_content
    end

    def create
        buying_content = BuyingContent.create!(buying_content_params)
        if buying_content
            render json: buying_content
        else 
            render json: buying_content.errors
        end
    end

    def update
        buying_content = BuyingContent.find(params[:id])
        if buying_content.update_attributes(buying_content_params)
            render json: buying_content
        else
            render json: buying_content.errors, status: :unprocessable_entity
        end
    end



    private

    def buying_content_params
        params.require(:buying_content).permit(:content, :headerText1, :headerText2)
    end


    
end
