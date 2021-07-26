import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// concectar la app con connect
import { connect } from 'react-redux';
import { setFavorite, deleteFavorite } from '../actions';

import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = (props) => {
  const { title, cover, year, contentRating, duration, id, isList } = props;

  const handleSetFavorite = () => {
    props.setFavorite({
      title, cover, year, contentRating, duration, id,
    });
  };

  const handleDeleteFavorite = (itemId) => {
    props.deleteFavorite(itemId);
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>
          {
            isList ? (
              <img
                className='carousel-item__details--img'
                src={removeIcon}
                alt='Remove Icon'
                onClick={() => handleDeleteFavorite(id)}
              />
            ) : (
              <img
                className='carousel-item__details--img'
                src={plusIcon}
                alt='Plus Icon'
                onClick={handleSetFavorite}
              />
            )
          }
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration} minutos`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  title: PropTypes.string,
  cover: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  id: PropTypes.number,
  isList: PropTypes.bool,
};

const mapDispatchToProps = {
  // retorna un objeto que sera props del componente con valores que son las acciones
  setFavorite,
  deleteFavorite,
};

export default connect(null, mapDispatchToProps)(CarouselItem);
