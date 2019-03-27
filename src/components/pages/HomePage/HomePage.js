import React from 'react';

import ShoppingCartTable from '../../shopping-cart-table';
import BookList from '../../book-list';

import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <BookList />
      <ShoppingCartTable />
    </div>
  );
}

export default HomePage