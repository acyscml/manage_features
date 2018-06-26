import { helper } from '@ember/component/helper';

export function statuses([store]) {
  return store.findAll('status');
}

export default helper(statuses);
