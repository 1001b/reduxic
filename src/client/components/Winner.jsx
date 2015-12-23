import React from 'react';
import PureMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureMixin],
  render: function() {
    return <div className='winner'>
      Winner is {this.props.winner}!
    </div>;
  }
});