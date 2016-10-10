class FilterController < ApplicationController
	def auth
		render 'auth'
	end

	def set
		destroy_advanced_info_cookie

		cookies[:group] = params[:filters][:group].chop
		cookies[:min] = params[:filters][:min]
		cookies[:max] = params[:filters][:max]
		if params[:filters][:group] == 'printers'
			cookies[:color] = params[:filters][:color] if params[:filters][:color]
			cookies[:maxFormat] = params[:filters][:maxFormat] if params[:filters][:maxFormat]
			cookies[:doublePrint] = params[:filters][:doublePrint] if params[:filters][:doublePrint]
			cookies[:brand] = params[:filters][:brand] if params[:filters][:brand]
		end

		if params[:filters][:group] == 'mfus'
			cookies[:color] = params[:filters][:color] if params[:filters][:color]
			cookies[:maxFormat] = params[:filters][:maxFormat] if params[:filters][:maxFormat]
			cookies[:doublePrint] = params[:filters][:doublePrint] if params[:filters][:doublePrint]
			cookies[:brand] = params[:filters][:brand] if params[:filters][:brand]
		end

		if params[:filters][:group] == 'scanners'
			cookies[:kind] = params[:filters][:kind] if params[:filters][:kind]
			cookies[:automaticFeed] = params[:filters][:automaticFeed] if params[:filters][:automaticFeed]
			cookies[:doubleScan] = params[:filters][:doubleScan] if params[:filters][:doubleScan]
			cookies[:maxFormat] = params[:filters][:maxFormat] if params[:filters][:maxFormat]
			cookies[:brand] = params[:filters][:brand] if params[:filters][:brand]
		end

		if params[:filters][:group] == 'papers'
			cookies[:format] = params[:filters][:format] if params[:filters][:format]
			cookies[:brand] = params[:filters][:brand] if params[:filters][:brand]
		end

		if params[:filters][:group] == 'laminators'
			cookies[:kind] = params[:filters][:kind] if params[:filters][:kind]
		end

		if params[:filters][:group] == 'bookbinders'
			cookies[:kind] = params[:filters][:kind] if params[:filters][:kind]
		end

		if params[:filters][:group] == 'others'
			cookies[:kind] = params[:filters][:kind] if params[:filters][:kind]
		end







		render :json => {data: params[:filters]}


	end


end
