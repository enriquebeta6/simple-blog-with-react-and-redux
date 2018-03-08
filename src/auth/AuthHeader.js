import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthHeader = (props) => {
  return (
    <nav>
      <Link to='/' >Home</Link>
      <br/>
      <Link to={`/${props.session.id}/posts`} >Mis Posts</Link>
      <br/>
      <Link to='/' onClick={props.logout}>Logout</Link>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({
        type: 'LOGOUT'
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHeader);