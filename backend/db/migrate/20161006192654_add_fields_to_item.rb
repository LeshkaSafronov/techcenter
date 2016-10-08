class AddFieldsToItem < ActiveRecord::Migration
  def change
  	add_column :items, :width, :integer
  	add_column :items, :height, :integer
  	add_column :items, :depth, :integer
  end
end
