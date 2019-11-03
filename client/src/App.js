import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route,Switch }  from 'react-router-dom';
import Navbar from './components/layout/Navigation';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExpierence from './components/profile-forms/AddExperience';
import Alert from './components/layout/ui/alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
//Redux

import { Provider } from 'react-redux';
import store from './store';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const  App = () =>  {

  // Learn more about useEffect https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert/>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create-portfolio' component={CreateProfile} />
            <PrivateRoute exact path='/edit-portfolio' component={EditProfile} />
            <PrivateRoute exact path='/add-experience' component={AddExpierence} />
            
          </Switch>
        </section>
      </Fragment>
      </Router>
    </Provider>
)};

export default App;