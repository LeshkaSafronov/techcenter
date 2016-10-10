class AppController < ApplicationController
	
	def home
		cookies.permanent[:stgr_cart] ||= Cart.create!.id
		cookies.permanent[:log_cart] ||= Cart.create!(user_id: @user.id).id if logged_in?	
	  	@cheap = Item.find_by_sql('SELECT * FROM items i ORDER BY price LIMIT 4').map! { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
	  	@visited = Item.find_by_sql('SELECT * FROM items LIMIT 4').map! { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
	  	@top = Item.find_by_sql('SELECT * FROM items LIMIT 4').map! { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
	  	render :json => {message: 'Success'}
	end

	def action_missing name

		@name = name
		@hash = {}
		if (cookies[:group] && cookies[:group] == @name)
			@hash[:group] = @name
			if (@name == 'printer' || @name == 'mfu')
				@hash[:color] = cookies[:color].split('&') if cookies[:color]
				@hash[:maxFormat] = cookies[:maxFormat].split('&') if cookies[:maxFormat]
				@hash[:doublePrint] = cookies[:doublePrint].split('&') if cookies[:doublePrint]
				@hash[:brand] = cookies[:brand].split('&') if cookies[:brand]
			end

			if (@name == 'scanner')
				@hash[:kind] = cookies[:kind].split('&') if cookies[:kind]
				@hash[:automaticFeed] = cookies[:automaticFeed].split('&') if cookies[:automaticFeed]
				@hash[:doubleScan] = cookies[:doubleScan].split('&') if cookies[:doubleScan]
				@hash[:maxFormat] = cookies[:maxFormat].split('&') if cookies[:maxFormat]
				@hash[:brand] = cookies[:brand].split('&') if cookies[:brand]
			end

			if (@name == 'paper')
				@hash[:format] = cookies[:format].split('&') if cookies[:format]
				@hash[:brand] = cookies[:brand].split('&') if cookies[:brand]
			end

			if (@name == 'laminator' || @name == 'bookbinder' || @name == 'other')
				@hash[:kind] = cookies[:kind].split('&') if cookies[:kind]
			end
			@tmp = Item.where(@hash).where("price >= ? AND price <= ?", cookies[:min], cookies[:max])
		else
			destroy_advanced_info_cookie
			@tmp = Item.where(group: name)
		end
		@count = @tmp.count
		@tmp = @tmp.paginate(:page => params[:page], :per_page => params[:per_page])
		#@tmp = Item.where(group: name).paginate(:page => params[:page], :per_page => params[:per_page])
		#@tmp = @tmp.where("price >= ? AND price <= ?",params[:range].scan(/\d+/)[0].to_i,params[:range].scan(/\d+/)[1].to_i) if !params[:range].nil?
		
		@items = @tmp.map { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
		
		@max = Item.where(group: name).maximum(:price) || 0
		@min = Item.where(group: name).minimum(:price) || 0

		#cookies[:min] = @min
		#cookies[:max] = @max
		#render :json => {data: params[:filter]}
		if (params[:id])
			render :json => {id: params[:id], data: Item.where(group: @name, item_id: params[:id])}
		else
			render :json => {id: params[:id], count: @count, data: @items, min_max: {min: @min, max: @max}}
		end
	end

  def search
  	@fullCount = Item.where("name LIKE ? ",'%'+params[:query].downcase+'%').count
    @tmp = Item.where("name LIKE ? ",'%'+params[:query].downcase+'%').paginate(:page => params[:page], :per_page => params[:per_page])
    
    @items = @tmp.map { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
  	render :json => {count: @fullCount, data: @items}
  end

  def filter
  	render :json => {data: params}
  end

  def help
  end
  
end
