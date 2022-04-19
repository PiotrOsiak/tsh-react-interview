import React, { useState, useEffect } from 'react';

import './ProductsPagination.scss';

export const ProductsPagination = (props) => {
    const { productsPerPage, totalProducts, paginate, paginateCurrent } = props;
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // const DOTS = '...';


    for(let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
        // if(totalPages > 6) {
            // if(i === paginateCurrent) {                
                // if(paginateCurrent === 1 || paginateCurrent === 2) {
                //     pageNumbers.push(i, i+1, i+2, '...', totalPages-2, totalPages-1, totalPages);
                // }

                // if(paginateCurrent > 3) {
                //     pageNumbers.push(i-1, i, i+1, '...', totalPages-2, totalPages-1, totalPages);
                // } 
                
                // else if(paginateCurrent >= totalPages-3) {
                //     pageNumbers.push('...', i, totalPages-2, totalPages-1, totalPages);                    
                // } 
                
                // else {
                //     pageNumbers.push(i, i+1, i+2, '...', totalPages-2, totalPages-1, totalPages);
                // }
            // }
        // } else {
        //     pageNumbers.push(i)
        // }
    }

    
    // if(pageNumbers.length > 6) {
    //     if(paginateCurrent > 0 || paginateCurrent < 4) {
    //         console.log(pageNumbers);        
    //     }
    // }



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
                                <a href="!#" onClick={(e) => { paginate(e, pageNumbers[0]) }} className={`button-link ${paginateCurrent === 1 ? 'button-link--active' : ''}`}>First</a>
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
                </div>
            </div>
        </>
    );
}
