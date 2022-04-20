import React from 'react';

import { MdGrade } from 'react-icons/md';

export const ProductItem = (props) => {
    return (
        <>
            <div className={`products__card ${!props.active ? 'products__card--unavailable' : ''}`} key={props.id}>
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
                        ) : <img src={ props.image } alt={ props.name } title={ props.name } className="image" role="img" />                        
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
                                    ))
                                }
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
}