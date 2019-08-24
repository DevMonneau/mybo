import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import {withFirebase} from './tools/Firebase';
import { AuthUserContext } from './tools/AuthUser';
import * as ROUTES from './components/constants/router';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Auth/Login'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      loading: true
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
       console.log(authUser); 
      this.setState({authUser, loading: false})
    })
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        {this.state.loading ? <h1>loading</h1> :
        <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
                <Route exact path={ROUTES.LOG} name="Login Page" component={Login} />
                <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
        </Router>
        }
      </AuthUserContext.Provider>
    );
  }
}

export default compose(withFirebase)(App);
