import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import LOGO from 'assets/images/GapLogo_white.png';

const Navigation = () => {
  return (
    <div className="Navigation">
      <Link className="Navigation-logo" to={'/'}>
        <img src={LOGO} alt="logo"/>
      </Link>
    </div>
  );
};

Navigation.propTypes = {
};

export default Navigation;