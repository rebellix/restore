import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, fetchBooksOld, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import { bindActionCreators } from 'redux';

import BookList from './book-list';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddToCart } = this.props;    
    if (loading) return <Spinner />    
    if (error) return <ErrorIndicator />    
    return <BookList books={ books } onAddToCart={ onAddToCart } />;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error }}) => {
  return { books, loading, error }
}

// mapDispatchToProps works async WITHOUT THUNK!

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const { bookstoreService } = ownProps;
//   return {
//     fetchBooks: fetchBooksOld(bookstoreService, dispatch),
//     onAddToCart: id => dispatch(bookAddedToCart(id))
//   }
// }

// version that uses THUNK middleware
const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddToCart: bookAddedToCart
  }, dispatch)
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)