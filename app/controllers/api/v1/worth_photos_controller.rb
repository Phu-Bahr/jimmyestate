class Api::V1::WorthPhotosController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      worth_photo = WorthPhoto.all
      render json: worth_photo
    end

    def create
      worth_photo = WorthPhoto.create!(worth_photo_params)
      if worth_photo
        render json: worth_photo
      else
        render json: worth_photo.errors
      end
    end

    def destroy
      worth_photo&.destroy
      render json: { message: 'worth_photo deleted'}
    end

    private

    def worth_photo_params
      params.require(:worth_photo).permit(:photo)
    end

    def worth_photo
      @worth_photo ||= WorthPhoto.find(params[:id])
    end

end