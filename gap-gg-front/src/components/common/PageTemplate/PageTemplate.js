import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import './PageTemplate.scss';
import Footer from '../Footer';

const PageTemplate = ({ type, children }) => {
  return (
    <div className="PageTemplate">
      <div className={ type === 'home' ? "PageTemplate-back" 
      : type === 'search' ? "PageTemplate-back search" 
      : "PageTemplate-back compare" }/>
      <div className="PageTemplate-nav">
        <Navigation/>
      </div>
      <div className="PageTemplate-body">
        {children}
      </div>
      <div className="PageTemplate-footer">
        <Footer/>
      </div>
    </div>
  );
};

PageTemplate.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default PageTemplate;