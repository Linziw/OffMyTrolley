Rails.application.routes.draw do
  resources :trolleys
  resources :users

  get '/logout', to: 'sessions#destroy'
  post '/login', to: 'sessions#new'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
