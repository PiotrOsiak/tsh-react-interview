import React, {useState} from 'react';
import { MdSearch, MdDone } from 'react-icons/md';

import './Header.scss';


const CheckboxComponent = (props) => {
  return (
    <div className="checkbox-item">
      <label>
        <input id={props.id} type="checkbox" name={props.name} className='checkbox'/>
        <span className="name">{ props.text }</span>
        <span className='custom'><MdDone className='checked' /></span>
      </label>
    </div>
  );
};

const SearchComponent = () => {
  return (    
    <div className='header__wrapper--search'>
      <div className="search__container">
        <div className="search__container--input">
          <label>
            <input type="text" />
            <span className="label">Search</span>
            <span className="icon">
              <MdSearch className='search' />
            </span>
          </label>
        </div>
        <div className="search__container--checkboxes">
          <CheckboxComponent id="label_active" name="active" text="Active" />
          <CheckboxComponent id="label_promo" name="promo" text="Promo" />
        </div>
      </div>
    </div>    
  );
};

const User = () => {
  let [showMenu, setShowMenu] = useState(false);
  let [auth, setAuth] = useState(false);

  const handleUserClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDropdown = (e) => {
    e.preventDefault();
    setAuth(false);
  }

  const handleLogout = () => {
    setAuth(true);
    setShowMenu(!showMenu);
  }

  return (
    <div className="header__wrapper--user">
      {
        auth ? (
          <div className="user">
            <div className='user--avatar' onClick={handleUserClick}>
              <img src="./user.png" alt='avatar' title='avatar' role='img' />
            </div>
            <div className={`user--dropdown ${showMenu ? "show" : ""}`}>
              <a href="/" className='button button-dropdown' onClick={handleDropdown}>Logout</a>
            </div>
          </div>  
        ) : (
          <div className="user-login">
            <button type='button' className='button button-primary' onClick={handleLogout}>Log in</button>
          </div>  
        )
      }        
    </div> 
  )
}

export const Header = () => {
  return (
    <>
      <header className='header'>
        <div className="header__wrapper">
          <div className='header__wrapper--title'>
            <p>join.tsh.io</p>
          </div>

          <SearchComponent />
          <User />   
          
        </div>
      </header>
    </>
  );
};
