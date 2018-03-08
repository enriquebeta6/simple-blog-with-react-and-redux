import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getPost();
  }

  componentWillUnmount(){
    this.props.clearPost();
  }

  editar = () => {
    const { post } = this.props;

    return this.props.ownProps.match.params.user && (
      <Link to={`/${post.user_id}/post/${post.id}/editar`}>
        <h4>Editar</h4>
      </Link>
    );
  }

  eliminar = () => {
    const { post } = this.props;

    return this.props.ownProps.match.params.user && (
      <button
        onClick={() => this.props.delete(this.props.post.id, this.props.session)}
      >
        Eliminar
      </button>
    )
  }

  render() {
    const { error } = this.props;

    return (
      <div>
        {this.props.deletedStatus}
        {error && <h2>{this.props.error}</h2>}
        {!error && <h2>{this.props.post.title}</h2>}
        {!error && this.editar()}
        {!error && this.eliminar()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.singlePost,
    error: state.errorPost,
    session: state.session,
    deletedStatus: state.deletedStatus,
    ownProps
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: () => {
      const { id } = ownProps.match.params;

      axios.get(`https://blog-api-u.herokuapp.com/v1/posts/${id}`)
        .then((response) => {
          dispatch({
            type: 'GET_POST',
            data: response.data
          });
        })
        .catch((error) => {
          dispatch({
            type: 'ERROR_GET_POST'
          });
        });
    },
    clearPost: () => {
      dispatch({
        type: 'CLEAR_POST'
      })
    },
    delete: (id, session) => {
      const { jwt, user_id } = session;

      axios.delete(`https://blog-api-u.herokuapp.com/v1/posts/${id}`, {
        headers: {
          'Authorization': 'Bearer' + jwt
        }
      })
        .then((response) => {
          dispatch({
            type: 'DELETED'
          });

          setTimeout(()=> {
            ownProps.history.push(`/${user_id}/posts`);
          }, 2000);
        })
        .catch((error) => {
          dispatch({
            type: 'ERROR_NOT_DELETED'
          });
          console.log(error);
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
