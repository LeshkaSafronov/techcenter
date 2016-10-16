Rails.application.routes.draw do

  get 'api/home' => 'app#home'
  get 'api/printers' => 'app#printer'
  get 'api/mfus' => 'app#mfu'
  get 'api/scanners' => 'app#scanner'
  get 'api/papers' => 'app#paper'
  get 'api/shredders' => 'app#shredder'
  get 'api/cartridges' => 'app#cartridge'
  get 'api/laminators' => 'app#laminator'
  get 'api/bookbinders' => 'app#bookbinder'
  get 'api/others' => 'app#other'
  get 'api/search' => 'app#search'
  get '/help' => 'app#help'

  get 'api/filter' => 'filter#auth'
  post 'api/filters' => 'filter#set'


  get 'api/users/(:id)' => 'user#show'
  get 'api/user/(:id)' => 'user#user'
  get 'api/users/(:id)/edit' => 'user#edit'
  patch 'api/user/(:id)/edit' => 'user#update'
  get 'api/signup' => 'user#new'
  post 'api/signup' => 'user#create'

  get 'api/login' => 'session#new'
  post 'api/login' => 'session#create'
  post 'api/logout' => 'session#destroy'


  get 'api/cart/(:id)' => 'cart#show'
  get 'api/cart/(:id)/process' => 'cart#info'
  post 'api/cart/(:id)/process' => 'cart#submit'

  get 'api/show/(:id)' => 'item#item'
  get 'api/item/(:id)' => 'item#show'
  post 'api/item/(:id)/add' => 'item#add'

  get 'api/new' => 'item#new'
  post 'api/new' => 'item#create'
  
  post 'api/item' => 'item#create'
  
  patch 'api/item/(:id)' => 'item#edit'

  get 'api/destroy/item/(:id)' => 'item#auth_destroy'
  post 'api/destroy/item/(:id)' => 'item#destroy'
  


  delete 'cart_item/(:id)' => 'cart_item#destroy'
  delete 'cart_items/(:id)' => 'cart_item#remove'
  post 'cart_item/(:id)' => 'cart_item#add'
  post 'feedback/(:id)' => 'item#rate'
  get 'feedback/(:id)/edit' => 'admin#feededit'

  get 'admin' => 'admin#index'
  get 'admin/(:id)' => 'admin#show'
  patch 'feedback/(:id)' => 'admin#feedupdate'
  delete 'feedback/(:id)' => 'admin#feeddestroy'

  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
