import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserPosts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getPosts(this.props.session);
  }

  componentWillUnmount(){
    this.props.clear();
  }

  getPosts = () => {
    const posts = this.props.posts.map((post) => {
      return (
        <Link key={post.id} to={`/${post.user_id}/post/${post.id}`}>
          <p>{post.title}</p>
        </Link>
      );
    });

    return posts;
  }

  render() {
    return (
      <div>
        <h2>Mis Posts</h2>
        <Link to={`/${this.props.session.id}/create`}>Crear Post</Link>
        <h2>Listar Posts</h2>
        {this.getPosts()}
        {this.props.error}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    posts: state.userPosts,
    error: state.errorUserPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPosts: (session) => {
      const { id, jwt } = session;

      axios.get(`https://blog-api-u.herokuapp.com/users/${id}/posts`, {
        headers: {
          'Authorization': 'Bearer' + jwt
        }
      })
        .then((response) => {
          dispatch({
            type: 'USER_POSTS',
            posts: response.data.posts
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: 'ERROR_USER_POSTS'
          });
        });
    },
    clear: () => {
      dispatch({
        type: 'CLEAR_USER_POSTS'
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
