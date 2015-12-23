import React from 'react';
import classNames from 'classnames';

let props = (component) => {
  return {
    getPair: function() {
      return this.props.pair || [];
    },
    isDisabled: function() {
      return !!this.props.hasVoted;
    },
    hasVotedFor: function(entry) {
      return this.props.hasVoted === entry;
    },
    render: function() {
      return <div className='voting'>
        {this.getPair().map(entry =>
        <button key={entry}
                className={classNames({voted: this.hasVotedFor(entry)})}
                disabled={this.isDisabled()}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {this.hasVotedFor(entry) ?
          <div className='label'>Voted</div> :
            null}
        </button>
          )}
      </div>;
    }
  };
};

export default React.createClass(props(this));
