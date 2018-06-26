class FeatureTestSerializer < ActiveModel::Serializer
  attributes :id, :name, :status
  belongs_to :feature
end
