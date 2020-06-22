import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import LOGO from 'assets/images/GapLogo_white.png';

const Navigation = ({ pageType }) => {
  return (
    <div className="Navigation">
      <Link className="Navigation-logo" to={'/'}>
        <img src={LOGO} alt="logo"/>
      </Link>
      <div className="Navigation-menuWrap">
        <Link to={'/compare'} className={ pageType === 'compare' ? "Navigation-menuWrap-menu same" : "Navigation-menuWrap-menu" }>
          전적 비교하기
        </Link>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  pageType: PropTypes.string.isRequired
};

export default Navigation;