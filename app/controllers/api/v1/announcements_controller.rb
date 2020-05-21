class Api::V1::AnnouncementsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        announcement = Announcement.all
        render json: announcement
    end

    def update
        announcement = Announcement.find(params[:id])
        if announcement.update_attributes(announcement_params)
            render json: announcement
        else
            render json: announcement.errors, status: :unprocessable_entity
        end
    end

    private
        def announcement_params
            params.require(:announcement).permit(:description, :title, :bannerImage)
        end
end