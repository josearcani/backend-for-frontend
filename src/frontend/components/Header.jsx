import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import classNames from 'classnames';
import { logoutRequest } from '../actions';

import gravatar from '../utils/gravatar';

import Logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';
import '../assets/styles/components/Header.scss';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  // props extra para condicionar el header

  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    // mandamos un objeto vacio reiniciando el estado
    // estamos simulando un logout y login
    props.logoutRequest({});
  };

  //  validaciones para ver si se encuentra en login y registro
  const headerClass = classNames('header', { isLogin, isRegister });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={Logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {
            hasUser ? (
              <img
                src={gravatar(user.email)}
                alt={user.email}
              />
            ) : (
              <img
                src={userIcon}
                alt=''
              />
            )
          }
          <p>Perfil</p>
        </div>
        <ul>
          {
            hasUser ? (
              <>
                <li>
                  <a href='/'>{user.name}</a>
                </li>
                <li>
                  <a href='#logout' onClick={handleLogout}>Cerrar sesión</a>
                </li>
              </>
            ) : (
              <li>
                <Link to='/login'>
                  Iniciar Sesión
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  isLogin: PropTypes.bool,
  isRegister: PropTypes.bool,
  // llega una funcion, no un objecto
  logoutRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
