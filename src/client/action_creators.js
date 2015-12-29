/**
 * Created by jeffreylaw on 12/16/15.
 */

import {SS,v} from './constants';

export function setState(state) {
  return {
    type: SS,
    state
  };
}

export function vote(entry) {
  return { /*action_creator*/
    type: v.toUpperCase(),
    entry
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

