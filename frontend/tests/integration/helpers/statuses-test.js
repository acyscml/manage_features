import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import service from '@ember/service';

function initialize( appInstance ) {
  let store = appInstance.lookup( 'service:store' );
  store.pushPayload( { "status": [
    "aaa","bbb","ccc"
  ]});
}

const storeStubFactory  = service.extend({
  data: null,
  init(){
    this.data = [];
  },

  pushPayload(payload){
    this.get('data').pushObject(payload);
  },

  findAll(store) {
    return this.get('data')[0][store];
  }
});

module('Integration | Helper | statuses', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    let instance = storeStubFactory.create();
    initialize({
      lookup:function(serviceName){
        return serviceName==='service:store' ? instance : null;
      }
    });

    this.store = instance
    await render(hbs`{{statuses store}}`);

    assert.equal(this.element.textContent.trim(), 'aaa,bbb,ccc');
  });
});
