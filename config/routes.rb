Rails.application.routes.draw do
  delete :logout, to: "api/v1/sessions#logout"
  get :logged_in, to: "api/v1/sessions#logged_in"
  
  # namespace :api do
  #   namespace :v1 do
  #     get 'venues/index'
  #     post 'venues/create'
  #     put 'venues/update/:id', to: 'venues#update'
  #     delete '/destroy/:id', to: 'venues#destroy'
  #   end
  # end

  namespace :api do
    namespace :v1 do
      resources :jumbotrons, only: [:index, :update]
      resources :footers, only: [:index, :update]
      resources :announcements, only: [:index, :update]
      resources :events, only: [:index, :create, :update, :destroy]
      get "/events/search", to: "events#search"
      resources :towns, only: [:index, :create, :update, :destroy, :show] do
        resources :town_links, only: [:index, :create, :update, :destroy]
      end
      resources :registrations, only: [:create]
      resources :sessions, only: [:create]
      resources :abouts, only: [:index, :update]
      resources :helper_links, only: [:index, :update, :create, :destroy]
      resources :about_companies, only: [:index, :update, :create]
      resources :jimmy_tips, only: [:index, :update, :create]
      resources :jimmy_partners, only: [:index, :update, :create]
      resources :portfolios, only: [:index, :create, :update, :destroy]
      resources :portfolio_edits, only: [:index, :update]
      resources :contacts, only: [:create]
      resources :contact_edits, only: [:index, :update]
      resources :home_worths, only: [:create]
      resources :worth_edits, only: [:index, :update]
      resources :worth_photos, only: [:index, :create, :destroy]
      resources :relocations, only: [:create]
      resources :relocation_edits, only: [:index, :update]
      resources :relocation_photos, only: [:index, :create, :destroy]
      resources :buying_contents, only: [:index, :create, :update, :destroy]
      resources :selling_contents, only: [:index, :create, :update, :destroy]
      resources :market_reports, only: [:create]
      resources :market_report_edits, only: [:index, :update]
      resources :market_report_photos, only: [:index, :create, :destroy]
      resources :venue_templates, only: [:index, :update, :create]
      resources :testimonial_edits, only: [:index, :update]
      resources :testimonials, only: [:index, :create, :update, :destroy]
      resources :partner_categories, only: [:index, :create, :update, :destroy, :show]
      resources :custom_cards, only: [:index, :update]
      resources :card_drafts, only: [:index, :update, :create]
      resources :privacy_policies, only: [:index, :update, :create]
      resources :disclosures, only: [:index, :update, :create]
     
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
