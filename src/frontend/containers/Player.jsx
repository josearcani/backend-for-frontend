import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getVideoSource } from '../actions';
import NotFount from './NotFound';

import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const { match, playing } = props;
  const { id } = match.params;
  const hasPlaying = Object.keys(playing).length > 0;

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ?
    (
      <div className='Player'>
        <video controls autoPlay>
          <source src={playing.source} type='video/mp4' />
        </video>
        <div className='Player-back'>
          <button type='button' onClick={() => props.history.goBack()}>
            Regresar
          </button>
        </div>
      </div>
    ) : <NotFount />;
};

Player.propsTypes = {
  playing: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDistachToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDistachToProps)(Player);
