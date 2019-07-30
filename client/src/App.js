import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateAccount from './components/account-form/CreateAccount';
import ViewAccounts from './components/account-form/ViewAccounts';
import AccountDetails from './components/account-form/AccountDetails';

import { setAuthUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

//REDUX
import { Provider } from 'react-redux';
import store from './store/store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(setAuthUser());
  }, []);

  // const params = getParams();
  // console.log(params);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/accounts' component={ViewAccounts} />
              <Route
                exact
                path='/accounts/:accountId'
                component={AccountDetails}
              />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-account'
                component={CreateAccount}
              />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
