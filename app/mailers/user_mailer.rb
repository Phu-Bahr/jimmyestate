class UserMailer < ApplicationMailer
    default from: 'no-reply@jimmyestateapp.com'
 
    def contact_me
        @contact = params[:contact]

        mail(
            to: Rails.application.credentials.gmail[:admin],
            subject: "Jimmy Estates - General Inquiry - #{params[:contact].name}"
        )
    end

    def home_worth
        @home_worth = params[:home_worth]

        mail(
            to: Rails.application.credentials.gmail[:admin],
            subject: "Jimmy Estates - Home Worth Inquiry - #{params[:home_worth].name}"
        )
    end

    def relocation
        @relocation = params[:relocation]

        mail(
            to: Rails.application.credentials.gmail[:admin],
            subject: "Jimmy Estates - Relocation Inquiry - #{params[:relocation].name}"
        )
    end
end
