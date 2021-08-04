import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../containers/Login';
import Home from '../containers/Home';
import Register from '../containers/Register';
import NotFound from '../containers/NotFound';
import Layout from '../containers/Layout';
import Player from '../containers/Player';

const App = ({ isLogged }) => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path='/' component={isLogged ? Home : Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/player/:id' component={isLogged ? Player : Login} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
