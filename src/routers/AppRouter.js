import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import CreateUser from '../components/CreateUser'
import Profile from '../components/Profile'
import PrivateRoute from './PrivateRoute'

export const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <Route path="/createUser" component={CreateUser} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  )
};

export default AppRouter;
