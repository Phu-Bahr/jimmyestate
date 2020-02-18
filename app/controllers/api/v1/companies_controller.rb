class Api::V1::CompaniesController < ApplicationController

    def index
        company = Company.all
        render json: company
    end

    def update
        company = Company.find(params[:id])
        if company.update_attributes(company_params)
            render json: company
        else
            render json: company.errors, status: :unprocessable_entity
        end
    end

    private
        def company_params
            params.require(:company).permit(:description)
        end
end

