import ReactDOM from 'react-dom';
import Router,{Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import {setState} from './action_creators';
import {Provider} from 'react-redux';
import remoteActionMiddleware from './remote_action_middleware';
import io from 'socket.io-client';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('state', state=>
  store.dispatch(setState(state))
);


const routes = <Route component={App}>
  <Route path='/results' components={ResultsContainer}/>
  <Route path='/' component={VotingContainer}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
