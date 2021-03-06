import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

import Header from '../components/Header';

import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import '../assets/styles/components/Login.scss';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  // cosntante para cambiar los cambios en los input
  const handleInput = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setValues({
      ...form,
      [name]: value,
      // de manera dinámica se guardan los values
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginUser(form, '/');
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form
            className='login__container--form'
            onSubmit={handleSubmit}
          >
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              value={form.email}
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              value={form.password}
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button type='submit' className='button'>Iniciar sesión</button>
            <div className='login__container--remember-me'>
              <label htmlFor='cbox1'>
                <input
                  type='checkbox'
                  id='cbox1'
                  value='first_checkbox'
                />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='Google icon' />
              Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='Twitter icon' />
              Inicia sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            {' '}
            {' '}
            <Link to='/register'>
              Regístrate
            </Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
