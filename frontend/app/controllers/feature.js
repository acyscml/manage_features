import Controller from '@ember/controller';
import { all } from 'rsvp';

export default Controller.extend({
  statusList: function() {
    return this.store.findAll('status');
  },

  actions: {
    saveTest: function(){
      var test_model = this.get("model");
      var listTests = test_model.featureTests.toArray().filter(function(model){
        return model.hasDirtyAttributes;
      });

      if(!listTests.length) {
        alert('Nothing to update');
        return;
      }

      var promises = listTests.reduce(function(memo, current) {
        var last;
        if(memo.length < 1) {
            return memo.concat(current.save().then().catch(function(reason){
              alert(reason);
            }));
        } else {
            last = memo[memo.length - 1];

            return memo.concat(last.then(function() {
                return current.save();
            }, function(reason){
              alert(reason);
            }));
        }
      }, []);

      all(promises).then(function(param){
        var cleaned_param = param.filter(function(e){return e});

        if(!cleaned_param.length)
          alert('An error occured during save');
        else
          alert('Saved succesfully !');
      });
    },

    createFeatureTest: function() {
      var count = this.model.featureTests.length + 1
      var new_record = this.store.createRecord('featureTest', {
        name: 'Test '+count,
        status: 'undefined',
        feature: this.model
      });

      new_record.save();
    }
  }
});
