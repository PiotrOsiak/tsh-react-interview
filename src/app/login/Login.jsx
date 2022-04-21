import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { AppRoute } from "../../routing/AppRoute.enum";

import axios from "axios";

import './Login.scss';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ statusCode: null, message: "" });
    const history = useHistory();

    const validate = () => username.length > 0 && password.length > 0;

    const handleLogin = (e) => {
        e.preventDefault();

        const authenticate = async () => {
            await axios.post("https://join-tsh-api-staging.herokuapp.com/users/login", {
                username,
                password
            }).then((response) => {
                if (error !== "") {
                    setError("");
                }

                sessionStorage.setItem("token", response.data.access_token);
                history.push(AppRoute.home);
            }).catch((error) => {
                // console.log(error.response.data);

                setError({
                    statusCode: error.response.data.statusCode,
                    message: error.response.data.message
                });
            });
        };

        if (username.length > 0 && password.length > 0) {
            authenticate();
        }
    };

  return (
    <>
      {/* {error.length ? ( */}
        <div className='snackbar'>
          <div className='snackbar__error'>
            <p className='snackbar__error--message'>
              {/* {error.statusCode}: {error.message} */}
              404: Not Found
            </p>
          </div>
        </div>
    {/* ) : null} */}

    <div className='login'>
        <div className='login__container'>
          <div className='login__container--image'>
            <img src='/images/login.png' alt='Join.tsh.io login' title='Join.tsh.io login' role='banner' />
          </div>
          <div className='login__container--panel'>
            <div className='panel'>
              <div className='panel__logo'>
                <Link to={AppRoute.home} className='panel__logo--action'>
                  join.tsh.io
                </Link>
              </div>
              <div className='panel__wrapper'>
                <div className='panel-title'>
                  <h1>Login</h1>
                </div>
                <form onSubmit={(e) => handleLogin(e)} className='panel__form'>
                  <div className='panel__form--block'>
                    <div className='panel__form--block-input'>
                      <label htmlFor='username'>Username</label>
                      <input
                        type='text'
                        id='username'
                        name='username'
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className='panel__form--block'>
                    <div className='panel__form--block-input'>
                      <label htmlFor='password'>Password</label>
                      <input
                        type='text'
                        id='password'
                        name='password'
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className='panel__form--block'>
                    <div className='panel__form--block-button'>
                      <button type='submit' className='button button-primary' disabled={!validate()}>Log in</button>
                    </div>
                  </div>
                  <div className='panel__form--block'>
                    <div className='panel__form--block-action'>
                      <Link to='/' onClick={(e) => { handlePasswordRecovery(e); }} className='button button-plain'>
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};