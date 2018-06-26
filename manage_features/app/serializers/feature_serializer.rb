class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :feature_tests
end
