import React , {useState} from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../routing/AppRoute.enum';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const validate = () => username.length > 0 && password.length > 0;
  
  const handleLogin = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <>
      <Link to={AppRoute.home}>Products page</Link>
      <h2>Login</h2>
      <form>
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
        <button type="submit" onSubmit={(e) => handleLogin(e) } disabled={!validate()}>submit</button>
      </form>
    </>
  );
};
