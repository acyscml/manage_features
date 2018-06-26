require 'rails_helper'

describe Api::FeatureTestsController do
  let(:feature) { Feature.create(name: 'Foo feature') }

  describe 'show' do
    let(:data) { feature.feature_tests.create(name: 'Foo', status: 1) }

    let(:params) { { id: data.id.to_s, format: :json } }

    it 'renders json for feature test' do
      get :show, params: params

      parsed_response = JSON.parse(response.body)['data']
      expect(parsed_response['attributes']['name']).to eq('Foo')
    end
  end

  describe 'create' do
    let(:data) { feature.feature_tests.create(name: 'Bla', status: 0) }

    let(:params) { { format: :json } }

    it 'renders json for feature test' do
      expect(FeatureTest).to receive(:new).and_return(data)
      post :create, params: params

      parsed_response = JSON.parse(response.body)['data']
      expect(parsed_response['attributes']['name']).to eq('Bla')
    end
  end

  describe 'update' do
    let(:data) { feature.feature_tests.create(name: 'Bla', status: 0) }

    let(:params) { { id: data.id.to_s, format: :json, data: { attributes: { name: 'New bla' }}} }

    context 'successful update' do
      it 'renders json for feature test' do
        post :update, params: params

        parsed_response = JSON.parse(response.body)['data']
        expect(parsed_response['attributes']['name']).to eq('New bla')
      end
    end

    context 'error during update' do
      let(:errors) { double('Errors', full_messages: 'Update feature failed') }

      it 'renders json for features' do
        allow(data).to receive(:update_attributes).and_return(false)
        allow(data).to receive(:errors).and_return(errors)
        allow(FeatureTest).to receive(:find).and_return(data)

        post :update, params: params

        parsed_response = JSON.parse(response.body)['errors']
        expect(parsed_response).to eq(errors.full_messages)
      end
    end
  end

  describe 'statuses' do
    let(:data) do
      {
        'Status 1' => 1,
        'Status 2' => 2,
        'Status 3' => 3
      }
    end

    it 'renders json list of statuses' do
      allow(FeatureTest).to receive(:statuses).and_return(data)
      get :statuses

      parsed_response = JSON.parse(response.body)['data']
      expect(parsed_response.length).to eq(3)
      expect(parsed_response[0]['attributes']['name']).to eq('Status 1')
      expect(parsed_response[1]['attributes']['name']).to eq('Status 2')
      expect(parsed_response[2]['attributes']['name']).to eq('Status 3')
    end
  end
end
