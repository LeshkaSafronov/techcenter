class SessionController < ApplicationController
	
	def new
		render 'new'
	end

	def create
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      if user.activated?
        log_in user
        params[:remember_me] == true ? remember(user) : forget(user)
        render :json => {message: 'Login success'}, :status => 200
      else
        message  = "Account not activated. "
        message += "Check your email for the activation link."
        flash[:warning] = message
        log_in user
        params[:remember_me] == true ? remember(user) : forget(user)
        render :json => {message: 'Login success', id: user.id}, :status => 200
      end
    else
      render :json => {error: 'Неправильный логин/пароль'}, :status => 422
    end
  end

	def destroy
		log_out
		render :json => {message: 'Logout success'}, :status => 200
	end

end
