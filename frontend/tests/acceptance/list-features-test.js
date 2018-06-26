import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';

var server;

module('Acceptance | list features', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    var features = [
      {
        id: 1,
        type: 'feature',
        attributes: {
          name: 'Feature 1'
        }
      },
      {
        id: 2,
        type: 'feature',
        attributes: {
          name: 'Feature 2'
        }
      },
      {
        id: 3,
        type: 'feature',
        attributes: {
          name: 'Feature 3'
        }
      }
    ];

    server = new Pretender(function() {
      this.get('/api/features', function() {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({data: features})];
      });

      this.get('/api/features/:id', function(request) {
        var feature = features.find(function(feature) {
          if (feature.id === parseInt(request.params.id, 10)) {
            return feature;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({data: feature})];
      });
    });

    hooks.afterEach(function() {
      server.shutdown();
    });
  });

  test('visiting /features', async function(assert) {
    await visit('/features');

    assert.equal(currentURL(), '/features');
  });

  test('contains title header', async function(assert){
    await visit('/features');

    assert.equal(this.element.querySelector('[id=title]').innerText, 'Features');
  });
});
