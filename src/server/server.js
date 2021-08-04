import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import axios from 'axios';

import React from 'react';
import { renderToString } from 'react-dom/server'; // una funcionalidad especial para servir string
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom'; // importamos o instalamos como depProducción
import { renderRoutes } from 'react-router-config'; // recibe un array de rutas para renderizar la app

import config from './config';
import reducer from '../frontend/reducer';

import serverRoutes from '../frontend/routes/serverRoutes';
import getManifest from './getManifest';

const { ENV, PORT } = config;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./utils/auth/strategies/basic');

if (ENV === 'development') {
  console.log('Development config');
  // eslint-disable-next-line global-require
  const webpackConfig = require('../../webpack.config.dev');
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler)); // hacer el hot module replacement de todo el proyecto
} else {
  console.log('Production config');
  // creamos un middleware para manifest inicio
  app.use((req, res, next) => {
    // si en hashManifest no hay nada regresar la función getManifest (solo si no existe)
    if (!req.hashManifest) req.hashManifest = getManifest();
    // seguimos con el proceso natural de la aplicación
    next();
  });
  // creamos un middleware para manifest fin

  app.use(express.static(`${__dirname}/public`)); // carpeta publica donde estará el bundle de webpack
  app.use(helmet()); // las config por defecto
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", '*'],
      scriptSrc: ["'self'", "'sha256-v1JBoIesI9TciwINSA3MzVnWXjYZxUyaUNfMbkqTpiQ='"],
    },
  }));
  app.use(helmet.permittedCrossDomainPolicies()); // la que se adecua al proyecto
  app.disable('x-powered-by'); // deshabilitamos una header asi el navegador no sabe que es un server con express
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js' ;

  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="shortcut icon" href="https://i.postimg.cc/T16gVyD6/badge.png" type="image/x-icon">
      <title>Platzi Video con React</title>
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="${mainBuild}" type="text/javascript"></script>
      <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
    </html>
  `);
};

const renderApp = async (req, res) => {
  let initialState;

  const { token, email, name, id } = req.cookies;

  try {
    let movieList = await axios({
      url: `${process.env.API_URL}/api/movies`,
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
    });

    movieList = movieList.data.data;

    initialState = {
      user: {
        email, name, id,
      },
      myList: [],
      trends: movieList.filter((movie) => movie.contentRating === 'PG' && movie._id),
      originals: movieList.filter((movie) => movie.contentRating === 'G' && movie._id),
    };

  } catch (error) {
    initialState = {
      user: {},
      myList: [],
      trends: [],
      originals: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState(); // sera pasado al frontend
  const isLogged = (initialState.user.id); // sera boleano
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes(isLogged))}
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

const THIRTY_DAYS_IN_MILI = 2592000000;
const TWO_HOURS_IN_MILI = 7200000 ;

app.post('/auth/sign-in', async (req, res, next) => {

  const { rememberMe } = req.body;

  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async (error) => {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie('token', token, {
          httpOnly: !(ENV === 'development'),
          secure: !(ENV === 'development'),
          maxAge: rememberMe ? THIRTY_DAYS_IN_MILI : TWO_HOURS_IN_MILI,
        });

        res.status(200).json(user);
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;

  try {
    const userData = await axios({
      url: `${process.env.API_URL}/api/auth/sign-up`,
      method: 'post',
      data: {
        'email': user.email,
        'name': user.name,
        'password': user.password,
      },
    });

    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id,
    });

  } catch (error) {
    next(error);
  }
});

app.post('/user-movies', async (req, res, next) => {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;
    // userMovie.userId = id;
    const { data } = await axios({
      url: `${process.env.API_URL}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: userMovie,
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${PORT}`);
});
