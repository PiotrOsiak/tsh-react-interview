import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/AppRoute.enum';

import { MdSearch, MdDone } from 'react-icons/md';

import axios from 'axios';

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
            <input type="text" onChange={(event) => props.onChange(event.target.value) } placeholder="Search" />
            <span className="icon">
              <MdSearch className='search' />
            </span>
          </label>
        </div>
        <div className="search__container--checkboxes">
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
  let [token, setToken] = useState(null);
  let [userData, setUserData] = useState({username: '', avatar: ''});

  const handleUserClick = () => {
    setShowMenu(!showMenu);
  };

  
  useEffect(() => {
    let bearerToken = null;
    
    if('token' in sessionStorage) {
      bearerToken = sessionStorage.getItem('token');
    }

    if(bearerToken) {
      setToken(bearerToken)
    }
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const isAuthenticated = async () => {
      await axios.get('https://join-tsh-api-staging.herokuapp.com/users/me', config).then(response => {
          setAuth(true);
          setUserData({
            username: response.data.username,
            avatar: response.data.avatar
          });
      }).catch(error => {
        // console.log(error.response);
      });
    }

    isAuthenticated();

  }, [auth, token]);
  

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setAuth(false);
    setShowMenu(false);
  }

  return (
    <div className="header__wrapper--user">
      {
        auth ? (
          <div className="user">
            <div className='user--avatar' onClick={handleUserClick}>
              <img src={userData.avatar} alt={userData.username} title={userData.username} role='img' />
            </div>            
            <div className={`user--dropdown ${showMenu ? "show" : ""}`}>
              <a href="/" className='button button-dropdown' onClick={handleLogout}>Logout</a>
            </div>
          </div>  
        ) : (
          <div className="user-login">
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

          <SearchComponent onChange={props.setSearchProduct} activeFilter={props.activeFilter} setActiveFilter={props.setActiveFilter} />
          <User />   
          
        </div>
      </header>
    </>
  );
};
