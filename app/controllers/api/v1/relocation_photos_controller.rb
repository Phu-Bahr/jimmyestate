class Api::V1::RelocationPhotosController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      relocation_photo = RelocationPhoto.all
      render json: relocation_photo
    end

    def create
      relocation_photo = RelocationPhoto.create!(relocation_photo_params)
      if relocation_photo
        render json: relocation_photo
      else
        render json: relocation_photo.errors
      end
    end

    def destroy
      relocation_photo&.destroy
      render json: { message: 'relocation_photo deleted'}
    end

    private

    def relocation_photo_params
      params.require(:relocation_photo).permit(:photo)
    end

    def relocation_photo
      @relocation_photo ||= RelocationPhoto.find(params[:id])
    end

end