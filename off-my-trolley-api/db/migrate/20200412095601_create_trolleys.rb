class CreateTrolleys < ActiveRecord::Migration[6.0]
  def change
    create_table :trolleys do |t|
      t.string :date
      t.string :time
      t.string :supermarket
      t.string :space
      t.string :user_id

      t.timestamps
    end
  end
end
