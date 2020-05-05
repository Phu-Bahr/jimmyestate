class Api::V1::RelocationEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        relocation_edit = RelocationEdit.all
        render json: relocation_edit
    end

    def update
        relocation_edit = RelocationEdit.find(params[:id])
        if relocation_edit.update_attributes(relocation_edit_params)
            render json: relocation_edit
        else
            render json: relocation_edit.errors, status: :unprocessable_entity
        end
    end

    private
        def relocation_edit_params
            params.require(:relocation_edit).permit(:bannerText1, :bannerText2, :paragraph1, :paragraph2)
        end
end