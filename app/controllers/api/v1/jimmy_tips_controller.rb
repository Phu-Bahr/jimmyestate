class Api::V1::JimmyTipsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        jimmy_tip = JimmyTip.all
        render json: jimmy_tip
    end

    def create
        jimmy_tip = JimmyTip.create!(jimmy_tip_params)
        if jimmy_tip
            render json: jimmy_tip
        else 
            render json: jimmy_tip.errors
        end
    end

    def update
        jimmy_tip = JimmyTip.find(params[:id])
        if jimmy_tip.update_attributes(jimmy_tip_params)
            render json: jimmy_tip
        else
            render json: jimmy_tip.errors, status: :unprocessable_entity
        end
    end

    private

    def jimmy_tip_params
        params.require(:jimmy_tip).permit(:content, :headerText1, :headerText2, :bannerImage)
    end
    
end
