import React from 'react';

import './ProductsNotFound.scss';

import { ReactComponent as Basket } from './basket.svg';

export const ProductsNotFound = () => {
    return (
        <>
            <div className="container__empty">
                <div className="container__empty--content">
                    <div className="content-image">
                        <Basket />
                    </div>
                    <div className="content-details">
                        <p className='content-text content-text--primary'>Ooops... It's empty here</p>
                        <p className='content-text content-text--secondary'>There are no products on the list</p>
                    </div>
                </div>
            </div>         
        </>
    );
}
