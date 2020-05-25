class Api::V1::WorthEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        worth_edit = WorthEdit.all
        render json: worth_edit
    end

    def update
        worth_edit = WorthEdit.find(params[:id])
        if worth_edit.update_attributes(worth_edit_params)
            render json: worth_edit
        else
            render json: worth_edit.errors, status: :unprocessable_entity
        end
    end

    private
        def worth_edit_params
            params.require(:worth_edit).permit(:bannerText1, :bannerText2, :paragraph1, :paragraph2, :bannerImage)
        end
end