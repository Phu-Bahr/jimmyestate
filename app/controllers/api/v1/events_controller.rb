class Api::V1::EventsController < ApplicationController

    protect_from_forgery unless: -> { request.format.json? }

    def search
        puts "reached search"
        geo_parser = GeoParser.new
        location = params[:location]
        geo_parser.search(location)
        render json: {data: geo_parser.data}
    end

    def index
        event = Event.all.order(date: :asc).where("date >= ?", Date.today)
        render json: event
    end

    def create
        event = Event.create!(event_params)
        if event
            render json: event
        else 
            render json: event.errors
        end
    end

    def update
        event = Event.find(params[:id])
        if event.update_attributes(event_params)
            render json: event
        else
            render json: event.errors, status: :unprocessable_entity
        end
    end

    def destroy
        event&.destroy
        render json: { message: 'Event deleted'}
    end

    private

    def event_params
        params.require(:event).permit(:title, :location, :date, :time, :flier, :lat, :lng, :timeEnd)
    end

    def event
        @event ||= Event.find(params[:id])
    end
    
end
