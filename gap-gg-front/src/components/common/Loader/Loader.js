import React from 'react';
import LOADING from 'assets/gif/loading.gif';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="Loader">
      <img src={LOADING} alt="loading"/>
    </div>
  );
};

export default Loader;