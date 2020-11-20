class Api::V1::DisclosuresController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        disclosure = Disclosure.all
        render json: disclosure
    end

    def create
        disclosure = Disclosure.create!(disclosure_params)
        if disclosure
            render json: disclosure
        else 
            render json: disclosure.errors
        end
    end

    def update
        disclosure = Disclosure.find(params[:id])
        if disclosure.update_attributes(disclosure_params)
            render json: disclosure
        else
            render json: disclosure.errors, status: :unprocessable_entity
        end
    end

    private

    def disclosure_params
        params.require(:disclosure).permit(:content)
    end


    
end
