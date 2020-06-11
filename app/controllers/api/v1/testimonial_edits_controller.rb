class Api::V1::TestimonialEditsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def index
        testimonial_edit = TestimonialEdit.all
        render json: testimonial_edit
    end

    def update
        testimonial_edit = TestimonialEdit.find(params[:id])
        if testimonial_edit.update_attributes(testimonial_edit_params)
            render json: testimonial_edit
        else
            render json: testimonial_edit.errors, status: :unprocessable_entity
        end
    end

    private

    def testimonial_edit_params
        params.require(:testimonial_edit).permit(:headerText1, :headerText2, :bannerImage)
    end

end