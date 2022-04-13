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
  return (
<div id={`product_${props.id}`} className={`product__modal ${props.show ? 'product__modal--show' : ''}`} data-product={props.id}>
    <div className="product__modal-overlay">
        <div className="product__modal--box">            
            <div className="product__modal--close" onClick={props.handleClose}>
                <MdClose color='var(--data-color-gray-dark)' />
            </div>
            <div className="box-wrapper">
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
                    Array(5).fill().map((_, index) => (
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

const ProductContainer = (props) => {
  const [dataModal, setDataModal] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  return props.loading ? <Spinner /> : props.items.length > 0 ? (
    <>
      <div className="products">
        {
          props.items.map(item => {
            return (
              <ProductItem 
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                rating={item.rating}
                image={item.image}
                promo={item.promo}
                active={item.active}
                onClick={evt => 
                  handleProductDetails(evt, item)
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
            show={dataModal} 
            handleClose={handleCloseModal} 
          />
        )
      }
      <ProductsPagination pages={props.totalPages} />
    </>
  ) : <ProductsNotFound />
};

export const Products = () => {
  // const [products, setProducts] = useState({items: [], meta: []});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);  

  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isPromo, setIsPromo] = useState(false);
    
  const handleSearch = (target) => {
    setSearchValue(target);
    
    if(!loading && products.length) {
      // console.log(products.items);

      // if(target) {
      //   setProducts(
      //     products.filter(product => {
      //       if(product.name === target) {
      //         return true
      //       }
      //       return false
      //     }),
      //   )
      // }
      // products.items.filter((data) => {
      //   if(data.name.toLowerCase().indexOf(target.toLowerCase()) != -1) {
      //     // filtered.push(data);
      //   }
      // });
      
      // setProducts(s => ({...s, items: filtered, meta: response.data.meta}));
    }
  }
  const checkboxActive = () => setIsActive(isActive => !isActive);
  const checkboxPromo = () => setIsPromo(isPromo => !isPromo);

  useEffect(() => { 
    let mounted = true;

    setLoading(true);

    
    if(mounted) {
      let searchRequest = '';      
      
      if(isActive) {
        searchRequest = 'limit=8&page='+currentPage+'&active='+isActive;
      } else if (isPromo) {
        searchRequest = 'limit=8&page='+currentPage+'&promo='+isPromo;
      } else if (isActive && isPromo) {
        searchRequest = 'limit=8&page='+currentPage+'&active='+isActive+'&promo='+isPromo;
      } else {
        searchRequest = 'limit=8&page='+currentPage;
      }
            
      // axios.get('https://join-tsh-api-staging.herokuapp.com/products?limit=8&page='+currentPage+'&active='+isActive+'&promo='+isPromo).then(response => {
      axios.get('https://join-tsh-api-staging.herokuapp.com/products?'+searchRequest).then(response => {
        if(mounted) {
          setLoading(false);

          setProducts(response.data.items);
          setCurrentPage(response.data.meta.currentPage);
          setTotalPages(response.data.meta.totalPages);
        }
      }).catch(error => {})
    }

    // axios.get('https://join-tsh-api-staging.herokuapp.com/products?limit=8&page=1&active='+isActive).then(response => {
    //   if(mounted) {
    //     setLoading(false);        

    //     let items = [];
    //     let metas = [];

    //     if(isActive) {     
    //       response.data.items.filter(item => item.active === isActive).map(item => {
    //         items.push(item);
    //       });
        
    //       if(items.length) {
    //         setProducts(items);

    //         console.log(response.data)
            
    //         // response.data.meta.filter(m => m.itemCount === items.length).map(mt => {
    //         //   metas.push(mt);
    //         // })
            


    //         // setProducts(s => ({...s, items: items, meta: response.data.meta}))            
    //       }
    //     } else if (isPromo) {
    //       response.data.items.filter(item => item.promo === isPromo).map(item => {
    //         items.push(item);
    //       });               
          
    //       if(items.length) {
    //         setProducts(items);
    //         // setProducts(s => ({...s, items: items, meta: response.data.meta}))
    //       }
    //     } else if (isActive && isPromo) {
    //       response.data.items.filter(item => item.active === isActive && item.promo === isPromo).map(item => {
    //         items.push(item);
    //       });               
          
    //       if(items.length) {
    //         setProducts(items);
    //         // setProducts(s => ({...s, items: items, meta: response.data.meta}))
    //       }
    //     } else {
    //       setProducts(response.data.items);
    //       console.log(response.data.meta);
    //       // setProducts(s => ({...s, items: response.data.items, meta: response.data.meta}))  
    //     }
    //   }
    // }).catch(error => {});

    return function cleanup() {
      mounted = false;
    }
  }, [isActive, isPromo]);  


  return (
    <>        
        {/* <Header onInputChange={searchValue} search={isSearch} active={checkboxActive} promo={checkboxPromo} /> */}
        <Header onChangeSearch={handleSearch} search={searchValue} active={checkboxActive} promo={checkboxPromo} />

        <div className="container">
            <ProductContainer           
                loading={loading}
                items={products}
                totalPages={totalPages}
            />
        {/* <h2>Products page</h2> */}        
        </div>
    </>
  );
};
