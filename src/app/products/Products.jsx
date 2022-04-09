import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Products.scss';

import { AppRoute } from '../../routing/AppRoute.enum';
import { Header } from '../../components/Header/Header';

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
      <Header/>

      <div className="container">
        <h2>Products page</h2>
        <p>Users: { products.length }</p>
        <Link to={AppRoute.login}> Login </Link>
      </div>
    </>
  );
};
