require 'sinatra'
require 'haml'
require 'sass'
require 'csv'
require 'pry'
require 'chronic'

class Main < Sinatra::Application

	configure do
		set :haml, {format: :html5}
	end

end

get '/styles.css' do
	content_type 'text/css', charset: 'utf-8'
	sass :styles
end

get '/' do
	haml :index
end

post '/start_date_search' do
	releases = 0
	start_date = Chronic.parse params[:date]
	load_dates.reverse_each do |release_date|
		date = Chronic.parse release_date
		releases += 1 if start_date < date
	end
	releases.to_s
end

post '/date_range_search' do

end

private

def load_dates
	release_dates = []
	CSV.foreach('release_dates.csv') do |row|
		release_dates << row[1]
	end
	release_dates
end