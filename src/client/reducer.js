/**
 * Created by jeffreylaw on 12/15/15.
 */
import {List, Map} from 'immutable';
import {v,p,hV,SS} from './constants';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn([v, p]);
  if (currentPair && currentPair.includes(entry)) {
    return state.set(hV, entry);
  }
  else {
    return state;
  }
}

function resetVote(state) {
  const hasVoted = state.get(hV);
  const currentPair = state.getIn([v, p], List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove(hV);
  }
  else {
    return state;
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
    case SS:
      return resetVote(setState(state, action.state));
    case v.toUpperCase():
      return vote(state, action.entry);
  }
  return state;
}
