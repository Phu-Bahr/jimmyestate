class Api::V1::AboutsController < ApplicationController

    def index
        about = About.all
        render json: about
    end

    def update
        about = About.find(params[:id])
        if about.update_attributes(about_params)
            render json: about
        else
            render json: about.errors, status: :unprocessable_entity
        end
    end

    private
        def about_params
            params.require(:about).permit(:bannerText1, :bannerText2, :paragraph1, :paragraph2, :paragraph3, :paragraph4, :paragraph5, :paragraph6, :paragraph7, :paragraph8, :photo, :photoname, :photonumber, :photoemail, :photoaddress1, :photoaddress2)
        end
end