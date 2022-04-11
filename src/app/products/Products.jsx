import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { MdGrade, MdClose } from 'react-icons/md';

import './Products.scss';

// import { AppRoute } from '../../routing/AppRoute.enum';
import { Header } from '../../components/Header/Header';
import { ProductsNotFound } from '../../components/NotFound/ProductsNotFound';
import { ProductsPagination } from '../../components/Pagination/ProductsPagination';

import axios from 'axios';

const ProductItemModal = (props) => { 
  // console.log(props);

  return (
    <div id={`product_${props.id}`} className={`product__modal ${props.show ? 'product__modal--show' : ''}`} data-product={props.id}>
      <div className="product__modal-overlay">
        <div className="product__modal--box">
          <div className="product__modal--close" onClick={props.handleClose}>
            <MdClose color='var(--data-color-gray-dark)' />
          </div>
          <div className="product__modal--box-image">
            <img src={props.image} alt={props.name} title={props.name} role="img" />
          </div>
          <div className="product__modal--box-details">
            <div className="product__modal--box-details-title">
              <h2>{ props.name }</h2>
            </div>
            <div className="product__modal--box-details-description">
              <p>{ props.description }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductItem = (props) => { 
  return (
    <>
      <div className={`products__card ${props.active ? "available" : ""}`} key={props.id}>
        <div className="products__card-inner">
          <div className="products__card--image">
            {
              props.promo ? ( 
                <figure>
                  <img src={ props.image } alt={ props.name } title={ props.name } className="image" role="img" />
                  <figcaption>
                    <div className="products__card--image-label">
                      <span className="label-text">Promo</span>
                    </div>
                  </figcaption>
                </figure>
              ) : (
                <img src={ props.image } alt={ props.name } title={ props.name } className="image" role="img" />
              )
            }
          </div>
          <div className="products__card--details">
            <div className="products__card--details-name">
              <h2>{ props.name }</h2>
            </div>
            <div className="products__card--details-description">
              <p>{ props.description }</p>
            </div>
            <div className="products__card--details-rating">
              <span>
                  {
                    Array(5)
                      .fill()
                      .map((_, index) => (
                        <MdGrade 
                          key={index} 
                          className={`${index < props.rating ? 'colored' : 'plain'}`}
                        />
                      )
                  )}
              </span>
            </div>
            <div className="products__card--details-button">
              <a href="/" className={`button button-primary ${!props.active ? 'button-disabled' : ''}`} onClick={props.onClick}>
                { props.active ? 'Show details' : 'Unavailable' }
              </a>
            </div>
          </div>
        </div>
      </div>            
    </>
  );
};

const Spinner = () => {
  return <div className='spinner'><div className="spinner-inner"></div></div>;
};

const ProductContainer = () => {
  const [products, setProducts] = useState({items: [], meta: []});
  const [dataModal, setDataModal] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleProductDetails = (e, data) => {   
    e.preventDefault();

    setDataModal([data]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setDataModal(null);
    setOpenModal(false);

    return openModal;
  };

  useEffect(() => { 
    let mounted = true;

    axios.get('https://join-tsh-api-staging.herokuapp.com/products?limit=6&page=1').then(response => {
      // console.log(response.data)
      if(mounted) {
        setLoading(false);
        setProducts(s => ({...s, items: response.data.items, meta: response.data.meta}));
      }
    }).catch(error => {});

    return function cleanup() {
      mounted = false;
    }
  }, []);  

  return loading ? <Spinner /> :
  (       
    products.items.length > 0 ? 
      (
        <>
          <div className='products'>
            {
              products.items.map(product => {
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
                    onClick={evt => 
                      handleProductDetails(evt, product)
                    }
                  />
                )
              })
            }
          </div>    
          {
            dataModal && (
              <ProductItemModal 
                id={dataModal[0].id} 
                image={dataModal[0].image} 
                name={dataModal[0].name} 
                description={dataModal[0].description} 
                show={openModal} 
                handleClose={handleCloseModal} 
              />
            )
          }
          <ProductsPagination pages={products.meta.totalPages} />
        </>
      ) : <ProductsNotFound />
  )
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
