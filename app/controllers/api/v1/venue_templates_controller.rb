class Api::V1::VenueTemplatesController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        venue_template = VenueTemplate.all
        render json: venue_template
    end

    def create
        venue_template = VenueTemplate.create!(venue_template_params)
        if venue_template
            render json: venue_template
        else 
            render json: venue_template.errors
        end
    end

    def update
        venue_template = VenueTemplate.find(params[:id])
        if venue_template.update_attributes(venue_template_params)
            render json: venue_template
        else
            render json: venue_template.errors, status: :unprocessable_entity
        end
    end

    private

    def venue_template_params
        params.require(:venue_template).permit(:bannerImage, :headerText1, :headerText2, :content, :image)
    end


    
end
