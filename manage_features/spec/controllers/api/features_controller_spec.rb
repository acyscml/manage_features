require 'rails_helper'

describe Api::FeaturesController do
  let(:feature) { Feature.create(name: 'Foo feature') }

  describe 'index' do
    it 'renders json for all features' do
      expect(Feature).to receive(:all)
      get :index

      expect(response).to be_successful
    end
  end

  describe 'show' do
    let(:params) { { id: feature.id.to_s, format: :json } }

    it 'renders json for features' do
      get :show, params: params

      expect(response).to be_successful
      parsed_response = JSON.parse(response.body)['data']
      expect(parsed_response['attributes']['name']).to eq('Foo feature')
    end
  end

  describe 'create' do
    let(:data) { Feature.create(name: 'Bla') }

    let(:params) { { format: :json } }

    it 'renders json for feature' do
      expect(Feature).to receive(:new).and_return(data)
      post :create, params: params

      parsed_response = JSON.parse(response.body)['data']
      expect(parsed_response['attributes']['name']).to eq('Bla')
    end
  end

  describe 'update' do
    let(:params) { { id: feature.id.to_s, format: :json, data: { attributes: { name: 'New Foo feature' }}} }

    context 'successful update' do
      it 'renders json for features' do
        post :update, params: params

        parsed_response = JSON.parse(response.body)['data']
        expect(parsed_response['attributes']['name']).to eq('New Foo feature')
      end
    end

    context 'error during update' do
      let(:errors) { double('Errors', full_messages: 'Update feature failed') }

      it 'renders json for features' do
        allow(feature).to receive(:update_attributes).and_return(false)
        allow(feature).to receive(:errors).and_return(errors)
        allow(Feature).to receive(:find).and_return(feature)

        post :update, params: params

        parsed_response = JSON.parse(response.body)['errors']
        expect(parsed_response).to eq(errors.full_messages)
      end
    end
  end
end
