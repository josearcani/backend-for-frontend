import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../components/Footer';

const Layout = ({ children }) => (
  <div className='App'>
    {/* quitamos Header */}
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
