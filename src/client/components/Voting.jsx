import React from 'react';
import Winner from './Winner';
import Vote from './Vote';
import PureMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {v, p, w, hV} from '../constants';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  mixins: [PureMixin],
  render: function() {
    return <div>
      {this.props.winner ?
      <Winner ref={w} winner={this.props.winner}/> :
      <Vote {...this.props} />}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn([v, p]),
    hasVoted: state.get(hV),
    winner: state.get(w)
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);

