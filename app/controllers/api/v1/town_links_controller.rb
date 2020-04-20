class Api::V1::TownLinksController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      town = Town.find(params[:town_id])
      townlink = town.town_links.all
      render json: townlink
    end

    def create
      town = Town.find(params[:town_id])
      townlink = town.town_links.create!(townlink_params)

      if townlink
        render json: townlink
      else
        render json: townlink.errors
      end
    end

    def update
      townlink = TownLink.find(params[:id])
      if townlink.update_attributes(townlink_params)
          render json: townlink
      else
          render json: townlink.errors, status: :unprocessable_entity
      end
    end

    def destroy
      townlink&.destroy
      render json: { message: 'townlink deleted'}
    end

    private
    def townlink_params
      params.require(:town_link).permit(:townlink, :townlinkdescription)
    end

    def townlink
      @townlink ||= TownLink.find(params[:id])
    end

end