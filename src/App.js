import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {withFirebase} from './tools/Firebase';
import { AuthUserContext } from './tools/Session';
import { compose } from 'recompose';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Auth/Login'));

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      true
      ? <Component {...props}/>
    : <Redirect to='/login'/>
)}/>
);

const PublicRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
     true
      ? <Component {...props}/>
    : <Redirect to='/'/>
)}/>
);

class App extends Component {

  render() {
    return (
      <Router>
        <React.Suspense fallback={loading()}>
          <Switch>
            <PublicRoute exact path="/login" name="Login Page" component={Login} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default compose(withFirebase)(App);
