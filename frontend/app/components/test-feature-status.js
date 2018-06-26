import Component from '@ember/component';

export default Component.extend({
  actions: {
    onSelectStatus: function(value) {
      var status_name = this.test.store.peekRecord('status', value).name;
      this.test.set('status', status_name);
      // this.test.save().then().catch(function(reason){
      //   alert(reason);
      // })
    }
  }
});
