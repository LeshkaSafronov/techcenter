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
		@tmp = Item.where(group: name).paginate(:page => params[:page], :per_page => params[:per_page])
		@tmp = @tmp.where("price >= ? AND price <= ?",params[:range].scan(/\d+/)[0].to_i,params[:range].scan(/\d+/)[1].to_i) if !params[:range].nil?
		@items = @tmp.map { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
		@max = Item.where(group: name).maximum(:price)
		@min = Item.where(group: name).minimum(:price)
		if (params[:id])
			render :json => {id: params[:id], data: Item.where(group: @name, item_id: params[:id])}
		else
			render :json => {id: params[:id], count: Item.where(group: name).count, data: @items}
		end
	end

  def search
    @tmp = Item.where("name LIKE ? ",'%'+params[:query].downcase+'%').paginate(:page => params[:page], :per_page => params[:per_page])
    @items = @tmp.map { |x| x = { id: x.id, name: x.name, price: x.price, link: x.avatar.url, rate: x.calculate_rate} }
  	render :json => @items
  end

  def help
  end
  
end
