import React from 'react/addons';
import {List, Map} from 'immutable';
import {Results} from '../../src/client/components/Results';
import {expect} from 'chai';

import {movie1, movie2} from '../../src/client/constants';


const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate}
  = React.addons.TestUtils;
const rendInto = renderIntoDocument, scry = scryRenderedDOMComponentsWithClass;
const pair = List.of(movie1, movie2);
const tally = Map({[movie1]: 5});
const component = rendInto(
  <Results pair={pair} tally={tally}/>
);

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {

    const entries = scry(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain(movie1);
    expect(train).to.contain('5');
    expect(days).to.contain(movie2);
    expect(days).to.contain('0');
  });
  it('invokes the next callback when the next button is click', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    component.setProps({
      next: next
    });
    Simulate.click(React.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    component.setProps({winner: movie1});
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain(movie1);
  });
});