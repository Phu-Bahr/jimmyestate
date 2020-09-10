desc "Keeping sandbox active"
task no_sleep: :environment do
    puts "Keeping sandbox active"
    HTTParty.get("https://jimmy-estates-sandbox.herokuapp.com/")
end