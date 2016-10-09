class AddAdvancedFieldsToItem < ActiveRecord::Migration
  def change
  	add_column :items, :color, :string
  	add_column :items, :maxFormat, :string
  	add_column :items, :doublePrint, :string
  	add_column :items, :brand, :string
  	add_column :items, :automaticFeed, :string
  	add_column :items, :doubleScan, :string
  	add_column :items, :format, :string
  	add_column :items, :type, :string
  end
end
