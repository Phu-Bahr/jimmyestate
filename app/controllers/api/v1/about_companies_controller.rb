class Api::V1::AboutCompaniesController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        aboutcompany = AboutCompany.all
        render json: aboutcompany
    end

    def create
        aboutcompany = AboutCompany.create!(aboutcompany_params)
        if aboutcompany
            render json: aboutcompany
        else 
            render json: aboutcompany.errors
        end
    end

    def update
        aboutcompany = AboutCompany.find(params[:id])
        if aboutcompany.update_attributes(aboutcompany_params)
            render json: aboutcompany
        else
            render json: aboutcompany.errors, status: :unprocessable_entity
        end
    end

    private
        def aboutcompany_params
            params.require(:about_company).permit(:content, :image, :headerText1, :headerText2, :bannerImage)
            # :about_company needs to be singular from config route, not match the other method's variables
        end
end
