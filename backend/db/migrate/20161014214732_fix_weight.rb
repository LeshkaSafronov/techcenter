class FixWeight < ActiveRecord::Migration
  def change
  	remove_column :items, :weigth
  	add_column :items, :weight, :decimal
  end
end
