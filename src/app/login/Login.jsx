import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AppRoute } from '../../routing/AppRoute.enum';

import axios from 'axios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [error, setError] = useState('');

  let history = useHistory();
  
  const validate = () => username.length > 0 && password.length > 0;
  
  const handleLogin = (e) => {
    e.preventDefault();

    
    const authenticate = async () => {
      await axios.post('https://join-tsh-api-staging.herokuapp.com/users/login', {
        username, password
      }).then(response => {
        if(error !== '') {
          setError('');
        };

        sessionStorage.setItem('token', response.data.access_token);
        history.push(AppRoute.home);

      }).catch(error => {
        console.log(error.response.data);

        setError(error.response.data.message);
      })
    }

    if(username.length > 0 && password.length > 0) {
      authenticate();
    }
  };

  return (
    <>
      <Link to={AppRoute.home}>Products page</Link>

      <h2>Login</h2>

      <div className="error-message">
        <p>{ error }</p>
      </div>

      <form onSubmit={(e) => handleLogin(e) }>
        <div>
          <label>
            username:
            <input autoFocus={true} name="username" onChange={(e) => {setUsername(e.target.value) }} />
          </label>
        </div>
        <div>
          <label>
            password:
            <input name="password" type="password" onChange={(e) => {setPassword(e.target.value)}} />
          </label>
        </div>
        <button type="submit" disabled={!validate()}>submit</button>
      </form>
    </>
  );
};

Login.propTypes