import React, { useState, useEffect } from 'react';

import './ProductsPagination.scss';

// export const ProductsPagination = ({ productsPerPage, totalProducts, paginateFirst, paginate }) => {
export const ProductsPagination = (props) => {
    const { productsPerPage, totalProducts, paginate, paginateCurrent } = props;
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const DOTS = '...';

    const [max] = useState(4);
    const [min] = useState(1);

    for(let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);       
    }




    // If pagesCount n > 6 => 
        // If User at page 1;2 => 1,2,3 ... n-2, n-1, n
        // If User at page 3 => 2,3,4 ... n-2, n-1, n        
    // If Pages Count n <= 6
        // Return 1,2,3,4,5,6         

    return (
        <>
            <div className="pagination">
                <div className="pagination__wrapper">    
                    <nav>
                        <ul>
                            <li className='page-item page-item--first'>
                                <a href="!#" onClick={(e) => { paginate(e, pageNumbers[0]) }} className={`button-link ${paginateCurrent === pageNumbers[0] ? 'button-link--active' : ''}`}>First</a>
                            </li>
                            {pageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <a onClick={(e) => { paginate(e, number) }} href="!#" className={`page-link ${paginateCurrent === number ? 'page-link--active' : ''}`}>
                                        {number}
                                    </a>
                                </li>
                            ))}    
                            <li className='page-item page-item--last'>
                                <a href="!#" onClick={(e) => { paginate(e, pageNumbers.length) }} className={`button-link ${paginateCurrent === pageNumbers.length ? 'button-link--active' : ''}`}>Last</a>
                            </li>
                        </ul>    
                    </nav>     


                    {/* <p>first: 1</p>

                    <a href="" onClick={(evt) => handleFirstPage(evt)}>
                        First
                    </a>

                    <ul>
                        { props.totalPages <= 6 && [...Array(props.totalPages)].map((el, index) => ( <li key={index}> { (index + 1) } </li> )) }
                    </ul>

                    <p>last: { props.totalPages }</p> */}
                </div>
            </div>
        </>
    );
}
