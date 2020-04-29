class UserMailer < ApplicationMailer
    default from: 'no-reply@jimmyestateapp.com'
 
    def contact_me
        @contact = params[:contact]

        mail(
            to: Rails.application.credentials.gmail[:admin],
            subject: "Jimmy Site Inquiry - #{params[:contact].name}"
        )
    end
end
