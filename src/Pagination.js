import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setTotalPosts();
  }

  componentWillUnmount(){
    this.props.clear();
  }

  pages = () => {
    const totalPosts = this.props.pagination.total;
    const postsPerPage = 3;
    const total = Math.ceil(totalPosts / postsPerPage);
    const currentPage = this.props.pagination.page;
    const lista = [];

    let init = 1;
    let end = 10;

    if (total <= 10) {
      end = total;
    } else if (total > 10){

      if (currentPage >= (total - 4)){
        init = total - 9;
        end = total;
      } else if ((currentPage - 4) <= 0){
        init = 1;
        end = 10;
      } else {
        init = currentPage - 4;
        end = currentPage + 5;
      }

    }

    for (let i = init; i <= end; i++) {
      lista.push(
        <li key={i} data-page={i} data-current-page={currentPage === i}>
          {i}
        </li>
      );
    }

    return lista;
  }

  handleClick = (e) => {
    if (e.target.tagName !== 'UL'){
      const { page } = e.target.dataset;
      this.props.setCurrentPage(parseInt(page));
    }
  }

  render() {
    return (
      <div>
        <h2>Pagination</h2>
        <ul onClick={this.handleClick}>
          {this.pages()}
        </ul>
      </div>
    );
  }
}

const mapStateToPros = state => {
  return {
    pagination: state.pagination
  }
}

const mapDispatchToPros = dispatch => {
  return {
    setTotalPosts: () => {
      axios.get('https://blog-api-u.herokuapp.com/v1/totalposts')
        .then((response) => {
          let total = parseInt(response.data);

          dispatch({
            type: 'SET_TOTAL_POSTS',
            total
          })
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    setCurrentPage: (page) => {
      dispatch({
        type: 'SET_CURRENT_PAGE',
        page
      });
    },
    clear: () => {
      dispatch({
        type: 'CLEAR_PAGINATION'
      });
    }
  }
}

export default connect(mapStateToPros, mapDispatchToPros)(Pagination);
