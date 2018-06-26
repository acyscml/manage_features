import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForFindAll() {
    return "/api/feature_tests/statuses";
  }
});
