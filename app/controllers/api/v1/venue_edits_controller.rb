class Api::V1::VenueEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      venue_edit = VenueEdit.all
      render json: venue_edit
    end

    def update
      venue_edit = VenueEdit.find(params[:id])
      if venue_edit.update_attributes(venue_edit_params)
          render json: venue_edit
      else
          render json: venue_edit.errors, status: :unprocessable_entity
      end
    end

    private

    def venue_edit_params
      params.require(:venue_edit).permit(:bannerImage)
    end

end