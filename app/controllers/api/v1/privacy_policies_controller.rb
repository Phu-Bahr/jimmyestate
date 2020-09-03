class Api::V1::PrivacyPoliciesController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        privacy_policy = PrivacyPolicy.all
        render json: privacy_policy
    end

    def create
        privacy_policy = PrivacyPolicy.create!(privacy_policy_params)
        if privacy_policy
            render json: privacy_policy
        else 
            render json: privacy_policy.errors
        end
    end

    def update
        privacy_policy = PrivacyPolicy.find(params[:id])
        if privacy_policy.update_attributes(privacy_policy_params)
            render json: privacy_policy
        else
            render json: privacy_policy.errors, status: :unprocessable_entity
        end
    end

    private

    def privacy_policy_params
        params.require(:privacy_policy).permit(:content)
    end


    
end
