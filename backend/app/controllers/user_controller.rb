class UserController < ApplicationController
	before_action :logged_in_user, only: [:edit, :update]
	before_action :correct_user,   only: [:edit, :update]

	def show
		@user = User.find(params[:id])
		@data = @user.order_history
		render :json => {name: @user[:name], email: @user[:email], address: @user[:address], number: @user[:number], orders: @data[:orders]}
	end

	def user
		@user = User.find(params[:id])
		render 'show'
	end

	def new
		@user = User.new
		render 'new'
	end

	def edit
    	@user = User.find(params[:id])
  	end

	def create
	    @user = User.new(name: params[:name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
	    if @user.save
	      	@user.send_activation_email
	      	@user.save!
	      	log_in @user   	
	    	render :json => {message: 'Success'}, :status => 200
	    else
	    	render :json => @user.errors.messages, :status => 422
	    end
  	end

	def update
	    @user = User.find(params[:id])
	    if @user.authenticate(params[:user][:password_old])
	    	p params
	    	@user.avatar = params[:avatar] if !params[:avatar].nil?
		    @user.name = params[:name] if !params[:name].empty?
			@user.email = params[:email] if !params[:email].empty?
			@user.number = params[:number] if !params[:number].empty?
			@user.update_attributes(user_params) if !params[:user][:password].empty? && params[:user][:password] == params[:user][:password_confirmation]
			@user.address = get_address if !params[:city].empty?  
			@user.save!
			@data = @user.order_history
			render 'show'
		else
			@error = "Неверный пароль"
			render 'edit'
		end
	end

	private

	#making hash acceptable
    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end

	# Confirms a logged-in user.
    def logged_in_user
      unless logged_in?
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end

    # Confirms the correct user.
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end


end
