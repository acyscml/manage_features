class CreateFeatureTests < ActiveRecord::Migration[5.2]
  def change
    create_table :feature_tests do |t|
      t.string :name
      t.integer :status
      t.integer :feature_id

      t.timestamps
    end
  end
end
