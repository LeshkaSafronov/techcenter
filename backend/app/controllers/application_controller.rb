class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  	protect_from_forgery with: :exception

  	include SessionHelper
	include ApplicationHelper

	def destroy_advanced_info_cookie
		cookies.delete :group
		cookies.delete :color
		cookies.delete :maxFormat
		cookies.delete :doublePrint
		cookies.delete :brand
		cookies.delete :automaticFeed
		cookies.delete :doubleScan
		cookies.delete :format
		cookies.delete :kind
		cookies.delete :min
		cookies.delete :max
	end
	
end
