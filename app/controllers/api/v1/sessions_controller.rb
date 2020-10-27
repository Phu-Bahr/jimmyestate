require 'pry'

class Api::V1::SessionsController < ApplicationController

    include CurrentUserConcern

    def create
        user = User
            .find_by(email: params["user"]["email"])
            .try(:authenticate, params["user"]["password"])
        unless user&.admin
            return render(
                json: {
                    errors: ['no such user', 'verify credentials and try again or signup'] 
                },
                status: 401
            )
        end

        session[:user_id] =  user.id
        render(
            json: {
                logged_in: true,
                user: user
            },
            status: :created
        )
    end

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false,
                message: 'no such user'
            }
        end
    end

    def logout
        reset_session
        render json: { status: 200, logged_out: true }
    end
end
