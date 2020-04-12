class CreateTrolleys < ActiveRecord::Migration[6.0]
  def change
    create_table :trolleys do |t|
      t.date :date
      t.time :time
      t.string :supermarket
      t.integer :space
      t.integer :user_id

      t.timestamps
    end
  end
end
