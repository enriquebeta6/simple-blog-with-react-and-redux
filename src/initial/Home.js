import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Pagination from '../Pagination.js';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.actionGetPosts(this.props.pagination.page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pagination.page !== this.props.pagination.page) {
      this.props.actionGetPosts(nextProps.pagination.page);
    }
  }

  componentWillUnmount(){
    this.props.actionClearPosts();
  }

  getPosts = () => {
    const { session } = this.props;
    const posts = this.props.posts.map((post) => {
      let result = session && session.id === post.user_id;
      let url = result ? `${post.user_id}/post/${post.id}` : `/post/${post.id}`;

      return (
        <Link key={post.id} to={url}>
          <p>{post.title}</p>
        </Link>
      );
    });

    return posts;
  }

  render(){
    return (
      <div>
        <h2>Home</h2>
        <Pagination/>
        {this.getPosts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.allPosts,
    session: state.session,
    pagination: state.pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionGetPosts: (page) => {
      axios.get(`https://blog-api-u.herokuapp.com/v1/posts?page=${page}`)
        .then((response) => {
          dispatch({
            type: 'POSTS_LOADED',
            posts: response.data
          });
        })
        .catch((err) => {
          console.log('Error' ,err);
        });
    },
    actionClearPosts: () => {
      dispatch({
        type: 'CLEAR_POSTS'
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
