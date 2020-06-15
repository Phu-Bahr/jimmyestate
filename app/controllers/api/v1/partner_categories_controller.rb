class Api::V1::PartnerCategoriesController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      partner_category = PartnerCategory.all.order(name: :asc)
      render json: partner_category
    end

    def show
      partner_category = PartnerCategory.find(params[:id])
      render json: partner_category
    end

    def create
      partner_category = PartnerCategory.create!(partner_category_params)
      if partner_category
        render json: partner_category
      else
        render json: partner_category.errors
      end
    end

    def update
      partner_category = PartnerCategory.find(params[:id])
      if partner_category.update_attributes(partner_category_params)
          render json: partner_category
      else
          render json: partner_category.errors, status: :unprocessable_entity
      end
    end

    def destroy
      partner_category&.destroy
      render json: { message: 'partner_category deleted'}
    end

    private

    def partner_category_params
      params.require(:partner_category).permit(:name, :headerText1, :headerText2, :content, :bannerImage)
    end

    def partner_category
      @partner_category ||= PartnerCategory.find(params[:id])
    end

end