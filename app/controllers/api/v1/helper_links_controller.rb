class Api::V1::HelperLinksController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      helper_link = HelperLink.all.order(title: :asc)
      render json: helper_link
    end

    def create
      helper_link = HelperLink.create!(helper_link_params)
      if helper_link
        render json: helper_link
      else
        render json: helper_link.errors
      end
    end

    def update
      helper_link = HelperLink.find(params[:id])
      if helper_link.update_attributes(helper_link_params)
          render json: helper_link
      else
          render json: helper_link.errors, status: :unprocessable_entity
      end
    end

    def destroy
      helper_link&.destroy
      render json: { message: 'helper_link deleted'}
    end

    private

    def helper_link_params
      params.require(:helper_link).permit(:image, :title, :route)
    end

    def helper_link
      @helper_link ||= HelperLink.find(params[:id])
    end

end