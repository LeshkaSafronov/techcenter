module UserHelper
	def log_in(user)
	    session[:user_id] = user.id
	    cookies[:log_cart] ||= Cart.create(user_id: user.id).id
	    cookies[:user_name] ||= User.find_by(id: user.id).to_json(:only => [:name])
	    cookies[:user_id] = user.id
 	end
end
