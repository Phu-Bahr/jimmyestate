class Api::V1::FootersController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
    
    def index
        footer = Footer.all
        render json: footer
    end

    def update
        footer = Footer.find(params[:id])
        if footer.update_attributes(footer_params)
            render json: footer
        else
            render json: footer.errors, status: :unprocessable_entity
        end
    end

    private
        def footer_params
            params.require(:footer).permit(:name, :street, :citystate, :contact1, :contact2, :contact3, :contact4, :facebook, :twitter, :instagram, :other)
        end
end
