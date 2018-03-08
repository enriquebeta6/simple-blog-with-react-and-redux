import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import { connect } from 'react-redux';

import Home from './initial/Home';
import Login from './initial/Login';
import Signup from './initial/Signup';
import Post from './initial/Post';

import AuthHeader from './auth/AuthHeader';
import UserPosts from './auth/UserPosts';
import CrearPost from './auth/CrearPost';
import EditarPost from './auth/EditarPost';

const Header = () => {
  return (
    <nav>
      <Link to='/' >Home</Link>
      <br/>
      <Link to='/signup' >Sign Up</Link>
      <br/>
      <Link to='/login' >Login</Link>
    </nav>
  );
}

const App = (props) => {
  return props.session !== null
    ? 
      <Router> 
        <div>
          <AuthHeader />
          
          <Route exact path='/' component={Home} />
          <Route exact path='/post/:id' component={Post} />
          <Route exact path='/:user/post/:id' component={Post} />
          <Route exact path='/:user/posts' component={UserPosts} />
          <Route exact path='/:user/create' component={CrearPost} />
          <Route exact path='/:user/post/:id/editar' component={EditarPost} />

          <h2>App Aut</h2>
        </div>
      </Router>
    :
      <Router>
        <div>
          <Header/>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route exact path='/post/:id' component={Post} />
          <h2>App</h2>
        </div>
      </Router>
  ;
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    func: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);