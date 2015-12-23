/**
 * Created by jeffreylaw on 12/15/15.
 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/client/reducer';
import {movie1, movie2, movie3, movie4, v} from '../src/client/constants';

const initialState = Map();
const action = {
  type: 'SET_STATE',
  state: Map({
    vote: Map({
      pair: List.of(movie1, movie2),
      tally: Map({[movie1]: 1})
    })
  })
};

describe('reducer', () => {

  it('handles SET_STATE with plain JS payload', () => {

    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {

    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    }));
  });

  it('handles VOTE by setting has Voted', () => {
    const state = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    });
    const action = {type: v.toUpperCase(), entry: movie1};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      },
      hasVoted: movie1
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    });
    const action = {type: v.toUpperCase(), entry: movie3};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    }));
  });

  it('remove hasVoted on SET_STATE if pair changes', ()=> {
    const initialState = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      },
      hasVoted: movie1
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [movie3, movie4]
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [movie3, movie4]
      }
    }));
  });

});
