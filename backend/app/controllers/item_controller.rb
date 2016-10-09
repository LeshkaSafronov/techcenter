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
			if logged_in?
				CartItem.create(cart_id: cookies.permanent[:log_cart], item_id: @item.id, name: @item.name, price: @item.price, group: @item.group)
			else
				CartItem.create(cart_id: cookies.permanent[:stgr_cart], item_id: @item.id, name: @item.name, price: @item.price, group: @item.group)
			end
		end
		render :json => {message: 'Success'}
	end

	def rate
		Feedback.create(item_id: params[:id], user_id: current_user.id, review: params[:review], rate: params[:rating])
		redirect_to "/item/#{params[:id]}"
	end

	def edit
		params[:details] = storeable params[:details]
		@item = Item.find(params[:id]).update(item_params)
		redirect_to "/item/#{params[:id]}"
	end

	def destroy
		Item.find(params[:id]).delete
		redirect_to "/"
	end

	def item_params
		params.permit(:avatar, :name, :description, :details, :price, :group)
	end
end
