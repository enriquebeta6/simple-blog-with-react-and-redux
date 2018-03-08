import React, { Component } from 'react';
import EditarPostForm from './EditarPostForm';
import { connect } from 'react-redux';
import axios from 'axios';

class EditarPost extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  handleSubmit = (data) => {
    this.props.edit(data, this.props.editPost.id, this.props.session.jwt);
  }

  render() {
    return (
      <div>
        <h2>EditarPost</h2>
        <h2>{this.props.editStatus}</h2>
        <EditarPostForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editPost: state.editPost,
    session: state.session,
    editStatus: state.editStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch({
        type: 'CLEAR_EDIT_POST'
      });
    },
    edit: (data, id, jwt) => {
      axios.patch(`https://blog-api-u.herokuapp.com/v1/posts/${id}`,
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
        }
      )
       .then((response) => {
          console.log(response);
          dispatch({
            type: 'EDITED'
          });
        })
        .catch((error) => {
          dispatch({
            type: 'ERROR_EDITED'
          });
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarPost);
