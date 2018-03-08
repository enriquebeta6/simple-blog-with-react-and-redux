import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CrearPostForm from './CrearPostForm';
import { reset } from 'redux-form';

const CrearPost = (props) => {

  const handleSubmit = (data) => {
    const { jwt } = props.session;

    axios.post('https://blog-api-u.herokuapp.com/v1/posts', 
      {
        post: {
          title: data.title,
          body: data.content
        }
      },
      {
        headers: {
          'Authorization': 'Bearer' + jwt
      } 
    })
      .then((response) => {
        console.log(response);
        props.success();
      })
      .catch((error) => {
        console.log(error);
        props.error();
      });

  }

  return (
    <div>
      {props.postStatus}
      <h2>Crear Post</h2>
      <CrearPostForm onSubmit={handleSubmit} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    session: state.session,
    postStatus: state.createPost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    success: () => {
      dispatch(reset('crearPostForm'));

      dispatch({
        type: 'CREATED_POST'
      });
    },
    error: () => {
      dispatch({
        type: 'ERROR_CREATE_POST'
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearPost);