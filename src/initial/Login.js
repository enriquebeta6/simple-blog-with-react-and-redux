import React from 'react';
import LoginFormFinal from './LoginFormFinal';
import { connect } from 'react-redux';
import axios from 'axios';

const Login = (props) => {
  const loginUser = data => {
    axios.post('https://blog-api-u.herokuapp.com/v1/login', {
      login: {
        ...data
      }
    })
      .then((response) => {
        props.setUserToken(response.data);
        props.own.history.push('/');
      })
      .catch((error) => {
        props.errorLogin();
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginFormFinal onSubmit={loginUser} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session,
    own: ownProps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserToken: (data) => {
      dispatch({
        type: 'LOGIN',
        data
      });
    },
    errorLogin: () => {
      dispatch({
        type: ''
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);