import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import './Products.scss';

// import { AppRoute } from '../../routing/AppRoute.enum';
import { Header } from '../../components/Header/Header';

import axios from 'axios';

const ProductItem = (props) => {
  return (
    <div className={`products__card ${props.active ? "available" : ""}`} key={props.id}>
      <div className="products__card-inner">
        <ul>
          <li>{props.id}</li>
          <li>{props.name}</li>
          <li>{props.description}</li>
          <li>{props.rating}</li>
          <li>{props.image}</li>
          <li>{props.promo}</li>
          <li>{props.active}</li>
        </ul>
      </div>
    </div>
  );
};

const ProductContainer = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://join-tsh-api-staging.herokuapp.com/products?limit=8&page=1').then(response => {
      console.log(response.data.items);
      setProducts(response.data.items);
    }).catch(error => {
      console.log(error.response)
    })
  }, []);

  return (
    <div className='products'>
      {
        products.map(product => {
          return (
            <ProductItem 
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              rating={product.rating}
              image={product.image}
              promo={product.promo}
              active={product.active}
            />
          )
        })
      }
    </div>
  );
};

export const Products = () => {
  return (
    <>
      <Header />

      <div className="container">
        <ProductContainer />

        {/* <h2>Products page</h2> */}
        {/* <p>Products: { products.length }</p> */}
        {/* <Link to={AppRoute.login}> Login </Link> */}
      </div>
    </>
  );
};
