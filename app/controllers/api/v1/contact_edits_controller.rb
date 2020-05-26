class Api::V1::ContactEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        contact_edit = ContactEdit.all
        render json: contact_edit
    end

    def update
        contact_edit = ContactEdit.find(params[:id])
        if contact_edit.update_attributes(contact_edit_params)
            render json: contact_edit
        else
            render json: contact_edit.errors, status: :unprocessable_entity
        end
    end

    private

    def contact_edit_params
        params.require(:contact_edit).permit(
            :bannerImage,
            :headerText1,
            :headerText2,
            :name,
            :address,
            :phonenumber,
            :email,
            :lat,
            :lng
        )
    end
    
end
