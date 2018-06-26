import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

function initialize( appInstance ) {
  let store = appInstance.lookup( 'service:store' );
  store.pushPayload( { "status": [
    {id: 0, name: "aaa"},
    {id: 1, name: "bbb"},
    {id: 2, name: "ccc"}
  ]});
}

const testStub = Service.extend({
  store: null,

  init(store){
    this._super(...arguments);
    this.store = store;
  }
});

const storeStubFactory  = Service.extend({
  data: null,
  init(){
    this._super(...arguments)
    this.data = [];
  },

  pushPayload(payload){
    this.get('data').pushObject(payload);
  },

  findAll(store) {
    return this.get('data')[0][store];
  }
});

module('Integration | Component | test-feature-status', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    let instance = storeStubFactory.create();
    initialize({
      lookup:function(serviceName){
        return serviceName==='service:store' ? instance : null;
      }
    });

    this.test = testStub.create(instance);

    await render(hbs`{{test-feature-status test=test}}`);

    assert.equal(this.element.firstElementChild.innerHTML,
      "<div class=\"feature-test\">\n  <div class=\"feature-test-title\"></div>\n  <label>\n    <select>\n        <option value=\"0\">aaa</option>\n        <option value=\"1\">bbb</option>\n        <option value=\"2\">ccc</option>\n    </select>\n  </label>\n</div>\n");
  });
});
