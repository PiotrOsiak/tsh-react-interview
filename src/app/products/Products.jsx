import React, { useState, useEffect, useMemo } from 'react';

import './Products.scss';

import { Header } from '../../components/Header/Header';
import { ProductsNotFound } from '../../components/NotFound/ProductsNotFound';
import { ProductsPagination } from '../../components/Pagination/ProductsPagination';
import { ProductContainer } from '../../components/ProductsContainer/ProductsContainer';

import axios from 'axios';

export const Spinner = () => {
  return <div className='spinner'><div className="spinner-inner"></div></div>;
};

export const Products = () => {  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [searchProduct, setSearchProduct] = useState('');
  const [activeFilter, setActiveFilter] = useState([]);  

  const handlePageReturn = (e) => {
    e.preventDefault();

    setCurrentPage(1);
  }

  useEffect(() => { 
    
    const fetchProducts = async () => {
      setLoading(true);

      let res;

      if(activeFilter.active === true && activeFilter.promo) {
        res = await axios('https://join-tsh-api-staging.herokuapp.com/products?active='+activeFilter.active+'&promo='+activeFilter.promo);
      } else {
        res = await axios('https://join-tsh-api-staging.herokuapp.com/products');        
      }

      setLoading(false);  
      setProducts(res.data.items);
    }
    
    fetchProducts();

  }, [activeFilter]);

  const filteredProducts = useMemo(() => {
    const hasCategoryFilter = Object.values(activeFilter).includes(true);

    setCurrentPage(1);

    const matchesFilter = (product, index) => {
      if(hasCategoryFilter) {        
      
        if(activeFilter.active) {    
          return product.active;  
        }        
        if(activeFilter.promo) {
          return product.promo;
        }     
        
      } else {
        return product;
      }
    };
    
    return products.filter((product, index) => {
      if(product.name.toLowerCase().indexOf(searchProduct.toLowerCase()) > -1) {
        return product;
      }
    }).filter(matchesFilter);
  }, [products, searchProduct, activeFilter]);

  
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  const paginate = (e, pageNumber) => {
    e.preventDefault();

    if(pageNumber === '...' || pageNumber === undefined || pageNumber === 0) {
      return false;
    }
    
    setCurrentPage(pageNumber)
  }  

  return (
    <>                      
        <Header logoClick={handlePageReturn} setSearchProduct={setSearchProduct} setActiveFilter={setActiveFilter} />

        <div className="container">
          { 
            loading ? <Spinner /> : currentProducts.length > 0 ? (
              <> 
                <ProductContainer items={currentProducts} searchProduct={searchProduct}>
                  <ProductsPagination 
                    productsPerPage={productsPerPage} 
                    totalProducts={filteredProducts.length} 
                    paginate={paginate} 
                    paginateCurrent={currentPage} 
                  />
                </ProductContainer> 
              </>
            ) : <ProductsNotFound />
          }
        </div>
    </>
  );
};
