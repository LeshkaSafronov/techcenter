class AddWeigthToItem < ActiveRecord::Migration
  def change
  	add_column :items, :weigth, :decimal
  end
end
