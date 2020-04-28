class UserMailer < ApplicationMailer
    default from: 'no-reply@jimmyestateapp.com'
 
    def contact_me(contact)
        @contact = contact
        mail(
            to: "tpdevemail@gmail.com",
            subject: 'Customer inquiries'
        )
    end
end
