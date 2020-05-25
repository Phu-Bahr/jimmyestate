class Api::V1::SellingContentsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        selling_content = SellingContent.all
        render json: selling_content
    end

    def create
        selling_content = SellingContent.create!(selling_content_params)
        if selling_content
            render json: selling_content
        else 
            render json: selling_content.errors
        end
    end

    def update
        selling_content = SellingContent.find(params[:id])
        if selling_content.update_attributes(selling_content_params)
            render json: selling_content
        else
            render json: selling_content.errors, status: :unprocessable_entity
        end
    end

   

    private

    def selling_content_params
        params.require(:selling_content).permit(:content, :headerText1, :headerText2, :bannerImage)
    end


    
end
