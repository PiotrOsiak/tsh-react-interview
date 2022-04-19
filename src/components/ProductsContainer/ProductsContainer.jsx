import React, { useState } from 'react';

import { ProductItem } from './ProductItem/ProductItem';
import { ProductItemModal } from './ProductModal/ProductModal';

export const ProductContainer = (props) => {
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

    return (
        <>
            <div className="products">
                {
                props.items.filter((product) => {
                    return (
                        product.name.toLowerCase().indexOf(props.searchProduct.toLowerCase()) >= 0
                    );
                })
                .map(item => {
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
        </>
    );
}