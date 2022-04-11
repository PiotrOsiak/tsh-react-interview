import React, { useState, useEffect } from 'react';

import './ProductsPagination.scss';

export const ProductsPagination = (props) => {
    // const [count, setCount] = useState(0);

    // console.log(props)
    // const [total, setTotal] = useState(props.totalItems);
    // const [limit, setLimit] = useState(props.limitPerPage);
    // const [pages, setPages] = useState(props.totalPages);
    // const [current, setCurrent] = useState(props.currentPage);

    // If pagesCount n > 6 => 
        // If User at page 1;2 => 1,2,3 ... n-2, n-1, n
        // If User at page 3 => 2,3,4 ... n-2, n-1, n        
    // If Pages Count n <= 6
        // Return 1,2,3,4,5,6

    return (
        <>
            <div className='pagination'>
                <div className="pagination__wrapper">
                    <p>first: 1</p>
                    <ul>
                        { 
                            // props.pages <= 6 && props.pages.map(page => <li className='count'>{ page }</li>),
                            // props.pages > 6 && Array(props.pages).map((_, index) => <li key={index}>{ index }</li>)
                        }
                    </ul>
                    <p>last: { props.pages }</p>
                </div>
            </div>
        </>
    );
}
