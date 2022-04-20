import React, { useState, useEffect } from 'react';

import './ProductsPagination.scss';

export const ProductsPagination = (props) => {
    const { productsPerPage, totalProducts, paginate, paginateCurrent } = props;
    const [pages, setPages] = useState([]);
    const totalPages = Math.ceil(totalProducts / productsPerPage);    

    const createPagination = (current, total) => {
        // If total pages <= 6 return [1,2,3,4,5,6]
        if(total <= 6) {
            let n = [];
            for(let i = 1; i <= total; i++) {
                n.push(i);
            }
            setPages(n);
            return;
        }

        // If total pages > 6
        if(total > 6) {
            // If current page is 1 or 2 return [ 1, 2, 3, ..., total-2, total-1, total]
            if(current === 1 || current === 2) {
                setPages([1,2,3, '...', total-2, total-1, total]);
            }
            // If current page is between 2 and total - 4 return [ current-1, current, current+1, ..., total-2, total-1, total]
            if(current > 2 && current <= total - 3) {
                setPages([current-1, current, current+1, '...', total-2, total-1, total]);
            }

            if(current === total - 3) {
                setPages([1, '...', total-4, current, total-2, total-1, total]);
            }
            if(current === total - 2) {
                setPages([1, '...', total-4, total-3, current, total-1, total]);
            }
            if(current === total - 1) {
                setPages([1, '...', total-4, total-3, total-2, current, total]);
            }
            if(current === total) {
                setPages([1, '...', total-4, total-3, total-2, total-1, current]);
            }
        }
    }
    
    useEffect(() => {
        createPagination(paginateCurrent, totalPages);     
        
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        
    }, [paginateCurrent, totalPages]);

    return (
        <>
            <div className="pagination">
                <div className="pagination__wrapper">    
                    <nav>
                        <ul>
                            <li className='page-item page-item--first'>
                                <a href="!#" onClick={(e) => { paginate(e, 1) }} className={`button-link ${paginateCurrent === 1 ? 'button-link--active' : ''}`}>First</a>
                            </li>
                            {pages.map(number => (
                                <li key={number} value={number} className="page-item">
                                    <a onClick={(e) => { paginate(e, number) }} href="!#" className={`page-link ${paginateCurrent === number ? 'page-link--active' : ''}`}>
                                        {number}
                                    </a>
                                </li>
                            ))}    
                            <li className='page-item page-item--last'>
                                <a href="!#" onClick={(e) => { paginate(e, totalPages) }} className={`button-link ${paginateCurrent === totalPages ? 'button-link--active' : ''}`}>Last</a>
                            </li>
                        </ul>    
                    </nav>                   
                </div>
            </div>
        </>
    );
}
