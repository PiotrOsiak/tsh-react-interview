import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../routing/AppRoute.enum';

import axios from 'axios';

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://join-tsh-api-staging.herokuapp.com/products').then(response => {
      console.log(response.data.items);
      setProducts(response.data.items);
    }).catch(error => {
      console.log(error.response)
    })
  }, []);

  return (
    <>
      <h2>Products page</h2>
      <p>Users: { products.length }</p>
      <Link to={AppRoute.login}> Login </Link>
    </>
  );
};
