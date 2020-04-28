# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
    def contact_me
        UserMailer.with(user: User.first).contact_me
    end
end
