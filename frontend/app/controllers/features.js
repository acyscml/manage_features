import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.sorting = ['id:asc'];
  },

  sortedContent: computed.sort('model', 'sorting'),

  actions: {
    createFeature: function() {
      var count = this.model.length + 1
      var new_record = this.store.createRecord('feature', {
        name: 'Feature '+count
      });

      new_record.save();
    }
  }
});
