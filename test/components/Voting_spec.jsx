import React from 'react/addons';
import {Voting} from '../../src/client/components/Voting';
import {expect} from 'chai';

import {List} from 'immutable';

import {movie1, movie2, movie3} from '../../src/client/constants';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate}
  = React.addons.TestUtils;

describe('Voting react component', () => {


  const btn = 'button', scry = scryRenderedDOMComponentsWithTag;
  let votedWidth;
  const vote = (entry) => votedWidth = entry;
  const pair = [movie1, movie2];
  const component = renderIntoDocument(
    <Voting pair={pair}/>);

  component.setState({xyz: movie1});

  it('renders a pair of buttons', () => {
    const buttons = scry(component, btn);

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal(movie1);
    expect(buttons[1].textContent).to.equal(movie2);
  });

  it('invokes callback when a button is clicked', () => {

    component.setProps({vote: vote});
    const buttons = scry(component, btn);
    Simulate.click(buttons[0]);
    expect(votedWidth).to.equal(movie1);
  });

  it('disables buttons when user has voted', () => {

    component.setProps({hasVoted: movie1});
    const buttons = scry(component, btn);

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    component.setProps({hasVoted: movie1});
    const buttons = scry(component, btn);

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    component.setProps({winner: movie1});
    const buttons = scry(component, btn);
    expect(buttons.length).to.equal(0);

    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain(movie1);

  });

  it('renders as a pure component', () => {
    //reset component to initial state
    component.setProps({winner: null, hasVoted: null});

    //change pair first movie
    pair[0] = 'Sunshine';

    component.setProps({pair: pair});
    const buttons = scry(component, btn);
    expect(buttons[0].textContent).to.equal(movie1);

  });

  it('does update DOM when prop changes', () => {
    const pair = List.of(movie1, movie2);
    component.setProps({pair: pair});

    let btn1 = scry(component, btn)[0];
    expect(btn1.textContent).to.equal(movie1);

    //change pair
    const newPair = pair.set(0, movie3);
    component.setProps({pair: newPair});
    btn1 = scry(component, btn)[0];
    expect(btn1.textContent).to.equal(movie3);

  });
});