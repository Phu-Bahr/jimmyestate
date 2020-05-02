# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
    def contact_me
        contact = Contact.new(name: "Tony Dog", email: "tp@hotmail.com", message: "testing this dog!")
        UserMailer.with(contact: contact).contact_me
    end

    def home_worth
        home_worth = HomeWorth.new(name: "Tony Dog", email: "tp@hotmail.com", message: "testing this dog!")
        UserMailer.with(home_worth: home_worth).home_worth
    end
end
