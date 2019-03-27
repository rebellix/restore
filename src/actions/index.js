const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }
}

const booksLoaded = (books) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: books
  }
}

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
}

const bookAddedToCart = (id) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: id
  }
}

const bookRemovedFromCart = (id) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: id
  }
}

const allBooksRemovedFromCart = (id) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: id
  }
}

// W/O thunk signature
const fetchBooksOld = (bookstoreService, dispatch) => () => {  
  dispatch(booksRequested());  
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((error) => dispatch(booksError(error)));
}

// with thunk middleware signature
const fetchBooks = (bookstoreService) => () => (dispatch) => {
  dispatch(booksRequested());  
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((error) => dispatch(booksError(error)));
}

export {
  fetchBooksOld,
  fetchBooks,
  bookAddedToCart,
  bookRemovedFromCart,
  allBooksRemovedFromCart
}