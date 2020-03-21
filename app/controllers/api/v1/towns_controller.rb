class Api::V1::TownsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      town = Town.all.order(name: :asc)
      render json: town
    end

    def create
      town = Town.create!(town_params)
      if town
        render json: town
      else
        render json: town.errors
      end
    end

    def update
      town = Town.find(params[:id])
      if town.update_attributes(town_params)
          render json: town
      else
          render json: town.errors, status: :unprocessable_entity
      end
    end

    def destroy
      town&.destroy
      render json: { message: 'town deleted'}
    end

    private

    def town_params
      params.require(:town).permit(:name, :headerText1, :headerText2, :paragraph1, :paragraph2, :paragraph3, :paragraph4, :paragraph5, :townheader, :townlink1, :townlink2, :townlink3 )
    end

    def town
      @town ||= Town.find(params[:id])
    end

end