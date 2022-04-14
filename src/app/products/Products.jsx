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

  const showDetailsModal = (e, data) => {   
    e.preventDefault();

    setDataModal([data]);
    setOpenModal(true);
  };

  const closeDetailsModal = () => {
    setDataModal(null);
    setOpenModal(false);

    return openModal;
  }; 

  // return props.loading ? <Spinner /> : props.items.length > 0 ? (
  return (
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
                  showDetailsModal(evt, item)
                }
              />
            )
          })
        }
      </div>

      {dataModal && 
        <ProductItemModal 
          id={dataModal[0].id} 
          image={dataModal[0].image} 
          name={dataModal[0].name} 
          description={dataModal[0].description} 
          show={dataModal} 
          handleClose={closeDetailsModal} 
        />
      }

      {props.children}


      {/* <ProductsPagination pages={props.totalPages} /> */}


    </>
  );
  // ) : <ProductsNotFound />
};

export const Products = () => {  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [pagination, setPagination] = useState([]);

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

    const fetchProducts = async () => {
      // setLoading(true);
      console.log(currentPage);
      const res = await axios('https://join-tsh-api-staging.herokuapp.com/products');

      console.log(res.data.items);

      setProducts(res.data.items);
      setPagination(res.data.meta);
      setLoading(false);
    }

    fetchProducts();
          
    // axios.get('https://join-tsh-api-staging.herokuapp.com/products?'+searchRequest).then(response => {
    //   if(mounted) {
    //     setLoading(false);

    //     setProducts(response.data.items);
    //     setPagination(response.data.meta);
    //     setCurrentPage(response.data.meta.currentPage);
    //   }
    // }).catch(error => {})
      

    return function cleanup() {
      mounted = false;
    }
  }, [isActive, isPromo, pagination.totalPages]);  


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    console.log(pageNumber);

    setCurrentPage(pageNumber)
  }  
  
  return (
    <>        
        {/* <h2>Products page</h2> */}        
        <Header onChangeSearch={handleSearch} search={searchValue} active={checkboxActive} promo={checkboxPromo} />

        <div className="container">
          { 
            loading && <Spinner /> 
          }        

          { 
            (!loading && products.length > 0) &&
              <>
                <ProductContainer items={currentProducts}> {/** products */}
                  <ProductsPagination 
                    productsPerPage={productsPerPage} 
                    totalProducts={products.length} 
                    paginate={paginate} 
                    paginateCurrent={currentPage} 
                  />
                </ProductContainer> 
              </>
          }

          {
            (!loading && products.length === 0) && <ProductsNotFound />
          }   
        </div>
    </>
  );
};
