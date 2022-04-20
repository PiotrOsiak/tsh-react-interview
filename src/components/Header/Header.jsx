import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/AppRoute.enum';

import { MdSearch, MdDone } from 'react-icons/md';

import './Header.scss';

const CheckboxComponent = (props) => {
  const { activeFilter, setActiveFilter } = props;

  const handleChange = (text) => (event) => {
    setActiveFilter((prev) => ({
      ...prev,
      [text]: event.target.checked
    }));
  };
  
  return (
    <div className="checkbox-item">
      <label>
        {/* <input id={props.id} type="checkbox" name={props.name} className='checkbox' onChange={(evt) => { props.onChange(evt) }} /> */}
        <input id={props.id} type="checkbox" name={props.name} className='checkbox' onChange={handleChange(props.name)} />
        <span className="name">{ props.text }</span>
        <span className='custom'><MdDone className='checked' /></span>
      </label>
    </div>
  );
};

const SearchComponent = (props) => {
  return (    
    <div className='header__wrapper--search'>
      <div className="search__container">
        <div className="search__container--input">
          <label>
            {/* <input type="text" value={props.search} onChange={(evt) => { props.onChange(evt.target, evt.target.value) }} /> */}
            <input type="text" onChange={(event) => props.onChange(event.target.value) } placeholder="Search" />
            {/* <span className="label">Search</span> */}
            <span className="icon">
              <MdSearch className='search' />
            </span>
          </label>
        </div>
        <div className="search__container--checkboxes">
          {/* <CheckboxComponent id="label_active" name="active" text="Active" onChange={props.activeCheckbox} />
          <CheckboxComponent id="label_promo" name="promo" text="Promo" onChange={props.promoCheckbox} /> */}
          <CheckboxComponent id="label_active" name="active" text="Active" setActiveFilter={props.setActiveFilter} />
          <CheckboxComponent id="label_promo" name="promo" text="Promo" setActiveFilter={props.setActiveFilter} />
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

  // const handleLogout = () => {
  //   setAuth(true);
  //   setShowMenu(false);
  // }

  return (
    <div className="header__wrapper--user">
      {
        auth ? (
          <div className="user">
            <div className='user--avatar' onClick={handleUserClick}>
              <img src="./images/avatar.png" alt='avatar' title='avatar' role='img' />
            </div>
            <div className={`user--dropdown ${showMenu ? "show" : ""}`}>
              <a href="/" className='button button-dropdown' onClick={handleDropdown}>Logout</a>
            </div>
          </div>  
        ) : (
          <div className="user-login">
            {/* <button type='button' className='button button-primary'>Log in</button> */}
            <Link to={AppRoute.login} className="button button-primary">Log in</Link>
          </div>  
        )
      }
    </div> 
  )
}

export const Header = (props) => {
  return (
    <>
      <header className='header'>
        <div className="header__wrapper">
          <div className='header__wrapper--title'>
            <a href="!#" onClick={(e) => props.logoClick(e)}>
              <p>join.tsh.io</p>
            </a>
          </div>

          {/* <SearchComponent onChange={props.onChange} search={props.search} activeCheckbox={props.active} promoCheckbox={props.promo} /> */}
          {/* <SearchComponent onChange={props.onChange} search={props.search} onCheckbox={props.onCheckbox} /> */}
          {/* <SearchComponent onChange={props.setSearchProduct} onCheckbox={props.onCheckbox} /> */}
          <SearchComponent onChange={props.setSearchProduct} activeFilter={props.activeFilter} setActiveFilter={props.setActiveFilter} />
          <User />   
          
        </div>
      </header>
    </>
  );
};
