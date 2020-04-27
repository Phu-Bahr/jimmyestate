class Api::V1::AboutCompaniesController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        aboutcompany = AboutCompany.all
        render json: aboutcompany
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
            params.require(:about_company).permit(:bannerText1, :bannerText2, :paragraph1, :paragraph2, :paragraph3, :paragraph4, :paragraph5, :paragraph6, :paragraph7, :paragraph8, :photo, :photoname, :photonumber, :photoemail, :photoaddress1, :photoaddress2)
            # :about_company needs to be singular from config route, not match the other method's variables
        end
end
