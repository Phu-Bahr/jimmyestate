Rails.application.routes.draw do
  delete :logout, to: "api/v1/sessions#logout"
  get :logged_in, to: "api/v1/sessions#logged_in"

  
  namespace :api do
    namespace :v1 do
      get 'venues/index'
      post 'venues/create'
      put 'venues/update/:id', to: 'venues#update'
      delete '/destroy/:id', to: 'venues#destroy'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :jumbotrons, only: [:index, :update]
      resources :footers, only: [:index, :update]
      resources :companies, only: [:index, :update]
      resources :announcements, only: [:index, :update]
      resources :events, only: [:index, :create, :update, :destroy]
      resources :towns, only: [:index, :create, :update, :destroy, :show]
      resources :registrations, only: [:create]
      resources :sessions, only: [:create]
      resources :abouts, only: [:index, :update]
      resources :about_companies, only: [:index, :update]
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
