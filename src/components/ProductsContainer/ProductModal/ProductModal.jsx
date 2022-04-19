import React from 'react';

import { MdClose } from 'react-icons/md';

export const ProductItemModal = (props) => { 
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