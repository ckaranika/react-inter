import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

//import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
import configureStore from './configureStore';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

function App() {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <Footer />
        </ConnectedRouter>
    </Provider>
  );
}

export default App;
