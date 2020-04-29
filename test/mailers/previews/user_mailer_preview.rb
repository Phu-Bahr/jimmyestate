# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
    def contact_me
        contact = Contact.new(name: "Tony Dog", email: "tp@hotmail.com", message: "testing this dog!")
        UserMailer.with(contact: contact).contact_me
    end
end
