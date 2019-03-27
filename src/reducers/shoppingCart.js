const updateCartItem = (item = {}, book, quantity) => {
  const { 
    id = book.id,
    title = book.title,  
    count = 0, 
    total = 0
  } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity*book.price
  }
}

const updateCartItems = (cartItems, item, index) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, index), 
            ...cartItems.slice(index + 1)]
  }
  
  return index === -1 
  ? [...cartItems, item]
  : [...cartItems.slice(0, index), 
      item, 
     ...cartItems.slice(index + 1)]
}

const updateOrder = (state, bookId, quantity) => {
  const { bookList: { books }, shoppingCart: { cartItems } } = state;
  const book = books.find(book => book.id === bookId);
  const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
  const item = cartItems[itemIndex];
  const newItem = updateCartItem(item, book, quantity);
  return {
    cartItems: updateCartItems(cartItems, newItem, itemIndex),
    orderTotal: 0
  };
}


const updateShoppingCart = (state, action) => {

  if(!state) {
    return {
      cartItems: [],
      orderTotal: 0
    }
  }

  switch(action.type) {
    case ('BOOK_ADDED_TO_CART'):
      return updateOrder(state, action.payload, 1);
    case ('BOOK_REMOVED_FROM_CART'):
      return updateOrder(state, action.payload, -1);
    case ('ALL_BOOKS_REMOVED_FROM_CART'):
      const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);
    default: 
      return state.shoppingCart;
  }
}

export default updateShoppingCart