# rails/app/controllers/api/features_controller.rb
class Api::FeaturesController < ApplicationController
  def index
    render json: Feature.all
  end

  def show
    render json: Feature.find(params[:id])
  end

  def create
    @feature = Feature.new(feature_params)
    @feature.save!

    render json: @feature
  end

  def update
    @feature = Feature.find(params[:id])
    if @feature.update_attributes(feature_params)
      render json: @feature
    else
      render json: { errors: @feature.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def feature_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end
end
