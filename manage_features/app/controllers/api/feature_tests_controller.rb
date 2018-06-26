# rails/app/controllers/api/features_controller.rb
class Api::FeatureTestsController < ApplicationController
  def show
    render json: FeatureTest.find(params[:id])
  end

  def create
    @feature_test = FeatureTest.new(feature_test_params)
    @feature_test.save!

    render json: @feature_test
  end

  def update
    @feature_test = FeatureTest.find(params[:id])
    if @feature_test.update_attributes(feature_test_params)
      render json: @feature_test
    else
      render json: { errors: @feature_test.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def statuses
    data = FeatureTest.statuses.map { |k,v| {id: v, type: 'status', attributes: { name: k } } }
    render json: { data: data }.to_json
  end

  private

  def feature_test_params
    ActiveModelSerializers::Deserialization.jsonapi_parse(params)
  end
end
