/**
 * Created by jeffreylaw on 12/15/15.
 */
import {List, Map, fromJS} from 'immutable';
import chai from 'chai';
import chaiImmutable from 'chai-immutable'

import reducer from '../src/client/reducer';
import {movie1, movie2, movie3, movie4, v} from '../src/client/constants';

chai.use(chaiImmutable);

const expect = chai.expect;

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
    const expected = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    });

    expect(nextState).to.equal(expected);
  });

  it('handles SET_STATE without initial state', () => {

    const nextState = reducer(undefined, action);
    const expected = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    });

    expect(nextState).to.equal(expected);
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
    const expected = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      },
      hasVoted: movie1
    });

    expect(nextState).to.equal(expected);
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

    const expected = fromJS({
      vote: {
        pair: [movie1, movie2],
        tally: {[movie1]: 1}
      }
    });

    expect(nextState).to.equal(expected);
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

    const expected = fromJS({
      vote: {
        pair: [movie3, movie4]
      }
    });

    expect(nextState).to.equal(expected);
  });

});
