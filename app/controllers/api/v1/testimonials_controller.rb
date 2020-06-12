class Api::V1::TestimonialsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        testimonial = Testimonial.all
        render json: testimonial
    end

    def create
        testimonial = Testimonial.create!(testimonial_params)
        if testimonial
            render json: testimonial
        else 
            render json: testimonial.errors
        end
    end

    def update
        testimonial = Testimonial.find(params[:id])
        if testimonial.update_attributes(testimonial_params)
            render json: testimonial
        else
            render json: testimonial.errors, status: :unprocessable_entity
        end
    end

    def destroy
        testimonial&.destroy
        render json: { message: 'testimonial deleted'}
    end

    private

    def testimonial_params
        params.require(:testimonial).permit(:image, :title, :description, :name)
    end

    def testimonial
        @testimonial ||= Testimonial.find(params[:id])
    end
    
end
