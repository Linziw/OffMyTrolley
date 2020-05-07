class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.string :name
      t.integer :stars

      t.timestamps
    end
  end
end
