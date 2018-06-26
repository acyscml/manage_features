import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list features', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /features', async function(assert) {
    await visit('/features');

    assert.equal(currentURL(), '/features');
  });

  test('contains title header', async function(assert){
    await visit('/features');

    assert.equal(this.element.querySelector('[id=title]').innerText, 'Features');
  });
});
