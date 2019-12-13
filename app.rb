require 'sinatra'
require 'json'

enable :sessions

get '/' do
  session[:temperature] ||= 20
  session[:psm] ||= true
  erb(:index)
end

get '/temperature' do
  response = { temperature: session[:temperature], psm: session[:psm] }
  response.to_json
end

post '/temperature' do
  session[:temperature] = params[:temperature].to_i
  session[:psm] = params[:psm]
  JSON.dump(temperature: session[:temperature], psm: session[:psm])
end
