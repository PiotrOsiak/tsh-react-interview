import React, {useState} from 'react';
import { MdSearch } from 'react-icons/md';
// import Image from '../../../public/user.png';

import './Header.scss';


const CheckboxComponent = (props) => {
  return (
    <div className="search-checkbox-item">
      <label>
        <input id={props.id} type="checkbox" name={props.name} className='checkbox'/>
        <span className="name">{ props.text }</span>
        <span className='custom'></span>
      </label>
    </div>
  );
};

const SearchComponent = () => {
  return (    
    <div className='header__wrapper--search'>
      <div className="header__wrapper--search-container">
        <div className="search-input">
          <label>
            <input type="search" />
            <span className="label">Search</span>
            <span className="icon">
              <MdSearch className='search' />
            </span>
          </label>
        </div>
        <div className="search-checkboxes">
          <CheckboxComponent id="label_active" name="active" text="Active" />
          <CheckboxComponent id="label_promo" name="promo" text="Promo" />
        </div>
      </div>
    </div>    
  );
};

const User = (props) => {
  let [showMenu, setShowMenu] = useState(false);
  let [auth, setAuth] = useState(props.authorized);

  const handleUserClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDropdown = (e) => {
    e.preventDefault();
    setAuth(false);
  }

  const handleLogout = () => {
    setAuth(true);
  }

  return (
    <div className="header__wrapper--user">
      {
        auth ? (
          <div className="header__wrapper--user-auth">
            <div className='user-auth-avatar' onClick={handleUserClick}>
              <img src="./user.png" alt='avatar' title='avatar' role='img' />
            </div>
            <div className={`user-auth-dropdown ${showMenu ? "show" : ""}`}>
              <a href="/" className='button-dropdown' onClick={handleDropdown}>Logout</a>
            </div>
          </div>  
        ) : (
          <div className="header__wrapper--user-not-auth">
            <button type='button' className='button button--primary' onClick={handleLogout}>Log in</button>
          </div>  
        )
      }        
    </div> 
  )
}

export const Header = () => {
  let [authorized, setAuthorized] = useState(true);

  return (
    <>
      <header className='header'>
        <div className="header__wrapper">
          <div className='header__wrapper--title'>
            <p className='header__wrapper--title-text'>join.tsh.io</p>
          </div>

          <SearchComponent />
          <User authorized={authorized} />   
          
        </div>
      </header>
    </>
  );
};
