class FeatureTest < ApplicationRecord
  enum status: [:undefined, :passed, :failed]

  belongs_to :feature
end
