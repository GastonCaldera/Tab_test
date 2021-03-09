import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Dashboard from '../componenst/Dashboard'
import Login from '../componenst/Login'
import CreateUser from '../componenst/CreateUser'
import Profile from '../componenst/Profile'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
