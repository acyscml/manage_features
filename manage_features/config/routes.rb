Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    get 'feature_tests/statuses', to: 'feature_tests#statuses'

    resources :features
    resources :feature_tests
  end
end
