import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 24) {
      setPasswordError('Пароль должен быть длиннее 8 и меньше 24 символов');
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandle = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        Cookies.set('access_token', data['access_token']);
        Cookies.set('refresh_token', data['refresh_token']);
        Cookies.set('company_name', data['company_name']);
        navigate('/main');
      } else {
        setLoginError(data.message || 'Неверный логин или пароль');
        console.error('Login failed:', data);
      }
    } catch (error) {
      setLoginError('Данные для входа не верные');
      console.error('Error:', error);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="wrapper_header">
          <h3>Авторизация</h3>
          <button onClick={handleRegister}>Регистрация</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            onChange={emailHandler}
            onBlur={blurHandle}
            value={email}
            name="email"
            type="text"
            placeholder="Введите ваш email"
          />
          {emailDirty && emailError && (
            <div style={{ color: 'red', textAlign:"center", fontSize:'11px', padding:'3px' }}>{emailError}</div>
          )}
          <label>Пароль</label>
          <input
            onChange={passwordHandler}
            onBlur={blurHandle}
            value={password}
            name="password"
            type="password"
            placeholder="Введите ваш пароль"
          />
          {passwordDirty && passwordError && (
            <div style={{ color: 'red', textAlign:"center", fontSize:'11px', padding:'3px' }}>{passwordError}</div>
          )}
          {loginError && (
            <div style={{ color: 'red', textAlign:"center", fontSize:'11px', padding:'3px' }}>{loginError}</div>
          )}
          <button disabled={!formValid} type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
