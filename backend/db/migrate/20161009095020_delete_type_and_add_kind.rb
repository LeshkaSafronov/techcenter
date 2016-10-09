class DeleteTypeAndAddKind < ActiveRecord::Migration
  def change
  	remove_column :items, :type
  	add_column :items, :kind, :string
  end
end
