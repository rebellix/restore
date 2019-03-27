import React from 'react';
import { connect } from 'react-redux';

import { bookAddedToCart, 
  bookRemovedFromCart, 
  allBooksRemovedFromCart 
} from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onDecrease, onIncrease, onRemove }) => {

  const renderRow = (item, index) => {
    const { id, title, count, total } = item;
    return (
      <tr key={ id }>
        <td>{ index + 1 }</td>
        <td>{ title }</td>
        <td>{ count }</td>
        <td>${ total }</td>
        <td>
          <button 
            onClick={() => onDecrease(id)}
            className="btn btn-outline-warning">
            <i className="fa fa-minus-circle"></i>
          </button>
          <button 
            onClick={() => onIncrease(id)}
            className="btn btn-outline-success">
            <i className="fa fa-plus-circle"></i>
          </button>
          <button 
            onClick={() => onRemove(id)}
            className="btn btn-outline-danger">
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
    )
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          { items.map(renderRow) }
        </tbody>
      </table>
      <div className="total">Total: ${ total }</div>
    </div>
  );
}

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal }}) => {
  return {
    items: cartItems,
    total: orderTotal
  }
}

const mapDispatchToProps = {
    onIncrease: bookAddedToCart,
    onDecrease: bookRemovedFromCart,
    onRemove: allBooksRemovedFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)