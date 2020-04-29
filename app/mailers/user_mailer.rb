class UserMailer < ApplicationMailer
    default from: 'no-reply@jimmyestateapp.com'
 
    def contact_me
        @contact = params[:contact]

        mail(
            to: <ADMIN_EMAIL>,
            subject: 'Customer inquiries'
        )
    end
end
