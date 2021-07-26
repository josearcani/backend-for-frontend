/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';

import '../assets/styles/Home.scss';

const Home = ({ myList, trends, originals }) => {
  return (
    <>
      <Header />
      <Search isHome />
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {
              myList.map((item) => {
                return <CarouselItem key={item.id} {...item} isList />;
              })
            }
          </Carousel>
        </Categories>
      )}

      <Categories title='Tendencias'>
        <Carousel>
          {
            trends.map((item) => {
              return <CarouselItem key={item.id} {...item} />;
            })
          }
        </Carousel>
      </Categories>

      <Categories title='Originales de Platzi Video'>
        <Carousel>
          {
            originals.map((item) => {
              return <CarouselItem key={item.id} {...item} />;
            })
          }
        </Carousel>
      </Categories>
    </>
  );
};

Home.propTypes = {
  myList: PropTypes.array,
  trends: PropTypes.array,
  originals: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    // solo traer lo que necesito Este objeto es referido como stateProps
    // ya que pasa a ser props del componente
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};

export default connect(mapStateToProps, null)(Home);
