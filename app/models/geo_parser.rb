require "httparty"


class GeoParser
  attr_reader :data

  def initialize
    @data = []
  end

  
  def search(location)
    api_key = Rails.application.credentials.GEO_KEY
    puts "reached search in geo parser!"
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{location}&key=AIzaSyD6C_ZUJ6fQsfWIyGlmd9iR9jHA3spb_30"
    
    response = HTTParty.get(url)

    if response["status"] === "ZERO_RESULTS"
      @data << {result: "No Results"}
    else
      lat = response["results"][0]["geometry"]["location"]["lat"]
      lng = response["results"][0]["geometry"]["location"]["lng"]
      @data << {lat: lat, lng: lng}
    end
  end
  
end


    # geo_data = response["results"][0]["geometry"]["bounds"]["northeast"].each do |item|
    #   new_hash = {
    #     item[0]=> item[1]
    #   }
    #   @data << new_hash
    # end