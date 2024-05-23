import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [companyNameDirty, setCompanyNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [confirmPasswordError, setConfirmPasswordError] = useState('Пароли не совпадают');
  const [companyNameError, setCompanyNameError] = useState('Строка не должна быть пуста');
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailError || passwordError || confirmPasswordError || companyNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, confirmPasswordError, companyNameError]);

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

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPasswordError('Пароли не совпадают');
    } else {
      setConfirmPasswordError('');
    }
  };

  const companyNameHandler = (e) => {
    setCompanyName(e.target.value);
    if (!e.target.value.trim()) {
      setCompanyNameError('Название компании не может быть пустым');
    } else {
      setCompanyNameError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'confirmPassword':
        setConfirmPasswordDirty(true);
        break;
      case 'companyName':
        setCompanyNameDirty(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, company_name: companyName }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('userData', { email, password, companyName });
        console.log('Registration successful:', data);
        navigate('/login');
      } else {
        if (response.status === 400 || response.status === 500) {
          setEmailError('Этот email уже существует');
        } else {
          const errorData = await response.json();
          if (errorData.error) {
            setEmailError(errorData.error);
          } else {
            setEmailError('Такой Email уже существует');
          }
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setEmailError('Такой Email уже существует');
    }
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div className="wrapper_register">
        <div className="wrapper_header_register">
          <h3>Регистрация</h3>
          <button onClick={handleLogIn}>Авторизация</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            onBlur={blurHandler}
            onChange={emailHandler}
            type="email"
            placeholder="Введите ваш Email"
            name="email"
            value={email}
          />
          {emailDirty && emailError && (
            <div style={{ color: 'red', textAlign:"center"  }}>{emailError}</div>
          )}
          <label>Пароль</label>
          <input
            onBlur={blurHandler}
            onChange={passwordHandler}
            type="password"
            name="password"
            placeholder="Введите ваш пароль"
            value={password}
          />
          {passwordDirty && passwordError && (
            <div style={{color: 'red', textAlign:"center" }}>{passwordError}</div>
          )}

          <label>Подтвердите пароль</label>
          <input
            onBlur={blurHandler}
            onChange={confirmPasswordHandler}
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите ваш пароль"
            value={confirmPassword}
          />
          {confirmPasswordDirty && confirmPasswordError && (
            <div style={{ color: 'red', textAlign:"center" }}>{confirmPasswordError}</div>
          )}

          <label>Название компании</label>
          <input
            onBlur={blurHandler}
            onChange={companyNameHandler}
            type="text"
            name="companyName"
            placeholder="Введите название вашей компании"
            value={companyName}
          />
          {companyNameDirty && companyNameError && (
            <div style={{ color: 'red', textAlign:"center"}}>{companyNameError}</div>
          )}

          <button disabled={!formValid} type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
