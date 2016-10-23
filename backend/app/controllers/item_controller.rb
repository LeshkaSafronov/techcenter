class ItemController < ApplicationController

	def new
		render 'new'
	end

	def show
		@item = Item.find(params[:id])
		@avatar = @item.avatar.url
		@feed = Feedback.where(item_id: params[:id]).map { |e| {:id => e.id,:avatar => User.find(e.user_id).avatar.url, :rate => e.rate, :review => e.review, :name =>  User.find(e.user_id).name} }
		render :json => {avatar: @avatar, data: @item}
	end

	def item
		render 'show'
	end

	def create
		@main_info = {
			name: params[:name],
			group: params[:group],
			price: params[:price],
			color_item: params[:color_item],
			weight: params[:weight],
			width: params[:width],
			height: params[:height],
			depth: params[:depth],
			description: params[:description],
			avatar: params[:avatar]
		}

		@advanced_info = {
			printer: {
				color: params[:color],
				maxFormat: params[:maxFormat],
				doublePrint: params[:doublePrint],
				brand: params[:brand]
			},
			mfu: {
				color: params[:color],
				maxFormat: params[:maxFormat],
				doublePrint: params[:doublePrint],
				brand: params[:brand]
			},
			scanner: {
				kind: params[:kind],
				automaticFeed: params[:automaticFeed],
				doubleScan: params[:doubleScan],
				maxFormat: params[:maxFormat],
				brand: params[:brand]
			},
			paper: {
				format: params[:format],
				brand: params[:brand]
			},
			cartridge: {},
			laminator: {
				kind: params[:kind]
			},
			bookbinder: {
				kind: params[:kind]
			},
			other: {
				kind: params[:kind]
			}
		}
		@item = Item.create(@main_info.merge(@advanced_info[params[:group].to_sym]))
		render :json => {message: 'Success', data: @main_info.merge(@advanced_info[params[:group].to_sym])}
	end

	def add
		@item = Item.find(params[:item_id])
		params[:quantity].to_i.times do
			CartItem.create(cart_id: params[:cart_id], item_id: @item.id, name: @item.name, price: @item.price, group: @item.group)
		end
		render :json => {message: 'Success'}
	end

	def remove
		@cart = CartItem.find_by(item_id: params[:item_id], cart_id: params[:cart_id])
		@cart.destroy! if @cart
		render :json => {message: 'Success'}
	end

	def rate
		Feedback.create(item_id: params[:id], user_id: current_user.id, review: params[:review], rate: params[:rating])
		redirect_to "/item/#{params[:id]}"
	end

	def edit
		item_params = params[:item]

		@main_info = {
			name: item_params[:name],
			group: item_params[:group],
			price: item_params[:price],
			color_item: item_params[:color_item],
			weight: item_params[:weight],
			width: item_params[:width],
			height: item_params[:height],
			depth: item_params[:depth],
			description: item_params[:description],
			avatar: item_params[:avatar]
		}
		
		@advanced_info = {
			printer: {
				color: item_params[:color],
				maxFormat: item_params[:maxFormat],
				doublePrint: item_params[:doublePrint],
				brand: item_params[:brand]
			},
			mfu: {
				color: item_params[:color],
				maxFormat: item_params[:maxFormat],
				doublePrint: item_params[:doublePrint],
				brand: item_params[:brand]
			},
			scanner: {
				kind: item_params[:kind],
				automaticFeed: item_params[:automaticFeed],
				doubleScan: item_params[:doubleScan],
				maxFormat: item_params[:maxFormat],
				brand: item_params[:brand]
			},
			paper: {
				format: item_params[:format],
				brand: item_params[:brand]
			},
			cartridge: {},
			laminator: {
				kind: item_params[:kind]
			},
			bookbinder: {
				kind: item_params[:kind]
			},
			other: {
				kind: item_params[:kind]
			}
		}

		@item = Item.find(params[:id]).update(@main_info.merge(@advanced_info[params[:group].to_sym]))
		render :json => {message: 'Success'}
	end
	
	def auth_destroy
		render 'auth_destroy'
	end

	def auth_add
		render 'auth_add'
	end

	def auth_remove
		render 'auth_remove'
	end
	
	def destroy
		Item.find(params[:id]).delete
		render :json => {message: 'Success'}, status: 200
	end
end
