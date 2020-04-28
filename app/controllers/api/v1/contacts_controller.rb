class Api::V1::ContactsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def create
        contact = Contact.create!(contact_params)
        if contact
            UserMailer.contact_me(contact).deliver_now
            render json: contact
        else
            render json: contact.errors
        end
    end

    private

    def contact_params
        params.require(:contact).permit( 
            :name, 
            :email, 
            :message
        )
    end
    
end
