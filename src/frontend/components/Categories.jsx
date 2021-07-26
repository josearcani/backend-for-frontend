import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/components/Categories.scss';

const Categories = ({ children, title }) => (
  <>
    <h3 className='categories__title'>{title}</h3>
    {children}
  </>
);

Categories.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
};

export default Categories;
