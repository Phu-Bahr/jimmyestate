class Api::V1::PortfolioEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        portfolio_edit = PortfolioEdit.all
        render json: portfolio_edit
    end

    def update
        portfolio_edit = PortfolioEdit.find(params[:id])
        if portfolio_edit.update_attributes(portfolio_edit_params)
            render json: portfolio_edit
        else
            render json: portfolio_edit.errors, status: :unprocessable_entity
        end
    end

    private

    def portfolio_edit_params
        params.require(:portfolio_edit).permit( 
            :bannerImage,
            :headerText1,
            :headerText2
        )
    end

    
end
