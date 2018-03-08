import React from 'react';
import SignupFormFinal from './SignupFormFinal';
import axios from 'axios';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

const Signup = (props) => {
  const createUser = data => {
    axios.post('https://blog-api-u.herokuapp.com/users', {
      user: {
        name: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirm 
      }
    })
      .then((response) => {
        props.success();
      })
      .catch((error) => {
        props.error();
      });
  }

  return (
    <div>
      <h2>Signup</h2>
      <br/>
      {props.message.message}
      <br/>
      <SignupFormFinal onSubmit={createUser} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.userStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    success: () => {
      dispatch({
        type: 'USER_CREATED'
      })

      dispatch(reset('SignupFormFinal'));
    },
    error: () => {
      dispatch({
        type: 'USER_ERROR'
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);