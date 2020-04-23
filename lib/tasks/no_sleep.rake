desc "Keeping Jimmy Estate site awake"
task no_sleep: :environment do
    puts "Keeping Jimmy Estate site awake"
    HTTParty.get("https://jimmyestates.herokuapp.com/")
end