class AddColorToItem < ActiveRecord::Migration
  def change
  	add_column :items, :color_item, :string
  end
end
