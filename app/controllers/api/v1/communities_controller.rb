class Api::V1::CommunitiesController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      community = Community.all.order(name: :asc)
      render js: community
    end

    def create
      community = Community.create!(community_params)
      if community
        render json: community
      else
        render json: community.errors
      end
    end

    def update
      community = Community.find(params[:id])
      if community.update_attributes(community_params)
          render json: community
      else
          render json: community.errors, status: :unprocessable_entity
      end
    end

    def destroy
      community&.destroy
      render json: { message: 'community deleted'}
    end

    private

    def community_params
      params.require(:community).permit(:headerText1, :headerText2, :paragraph1, :paragraph2, :paragraph3, :paragraph4, :paragraph5, :townheader, :townlink1, :townlink2, :townlink3, :town)
    end

    def community
      @community ||= Community.find(params[:id])
    end

end