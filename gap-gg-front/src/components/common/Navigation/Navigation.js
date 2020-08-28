import React from 'react';
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

export default Navigation;