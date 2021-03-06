module SessionHelper

  # Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id
    cookies[:log_cart] ||= Cart.create(user_id: user.id).id
    cookies[:user_name] ||= User.find_by(id: user.id).to_json(:only => [:name])
    cookies[:user_id] = user.id
  end

  # Remembers a user in a persistent session.
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # Returns true if the given user is the current user.
  def current_user?(user)
    user == current_user
  end
  
  # Returns the current logged-in user (if any).
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(:remember, cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # Forgets a persistent session.
  def forget(user)
    user.forget
    cookies.delete(:remember_token)
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end

  # Forget user info
  def forget_info(user)
    cookies.delete(:log_cart)
    cookies.delete(:user_name)
    cookies.delete(:user_id)
  end
  # Logs out the current user.

  def log_out
  	forget(current_user)
    forget_info(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  def has_data?
    return false if !logged_in?
    !current_user.address.nil? && !current_user.number.nil?
  end

  def is_admin?
    return false if current_user.nil?
    current_user.id == 1
  end

end
