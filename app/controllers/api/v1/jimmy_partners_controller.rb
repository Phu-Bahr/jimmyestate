class Api::V1::JimmyPartnersController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        jimmy_partner = JimmyPartner.all
        render json: jimmy_partner
    end

    def create
        jimmy_partner = JimmyPartner.create!(jimmy_partner_params)
        if jimmy_partner
            render json: jimmy_partner
        else 
            render json: jimmy_partner.errors
        end
    end

    def update
        jimmy_partner = JimmyPartner.find(params[:id])
        if jimmy_partner.update_attributes(jimmy_partner_params)
            render json: jimmy_partner
        else
            render json: jimmy_partner.errors, status: :unprocessable_entity
        end
    end



    private

    def jimmy_partner_params
        params.require(:jimmy_partner).permit(:bannerImage, :headerText1, :headerText2, :content, :image)
    end


    
end
