desc "Keeping jame's site awake"
task no_sleep: :environment do
    puts "Keeping jame's site awake"
    HTTParty.get("https://jamescoolsite.herokuapp.com/")
end