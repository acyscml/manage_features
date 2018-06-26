import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';
import { visit, click } from '@ember/test-helpers';

var server;

module('Integration | Feature Page', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    document.getElementById('ember-testing').scrollTop = 0;

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
  });

  hooks.afterEach(function() {
    server.shutdown();
  });


  test('Should list all features', async function(assert) {
    await visit('/features');

    let links = this.element.querySelectorAll('a');
    assert.equal(links.length, 3);
    assert.equal(links[0].innerText, 'Feature 1');
    assert.equal(links[1].innerText, 'Feature 2');
    assert.equal(links[2].innerText, 'Feature 3');
  });

  test('show a feature', async function(assert) {
    await visit('/features')

    let links = this.element.querySelectorAll('a');
    await click(links[1]);

    let title = this.element.querySelector('#title');
    assert.equal(title.innerText, 'Feature 2');
  });

  test('Should be able visit a feature page', async function(assert) {
    await visit('/features/3')

    let title = this.element.querySelector('#title');
    assert.equal(title.innerText, 'Feature 3');
  });
});
