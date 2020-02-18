class Api::V1::JumbotronsController < ApplicationController

    def index
        jumbotron = Jumbotron.all
        render json: jumbotron
    end

    def update
        jumbotron = Jumbotron.find(params[:id])
        if jumbotron.update_attributes(jumbo_params)
            render json: jumbotron
        else
            render json: jumbotron.errors, status: :unprocessable_entity
        end
    end

    private
        def jumbo_params
            params.require(:jumbotron).permit(:line1, :line2, :line3)
        end
end
