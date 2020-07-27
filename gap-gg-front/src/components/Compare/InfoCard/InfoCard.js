import React from 'react';
import PropTypes from 'prop-types';
import './InfoCard.scss';

const InfoCard = ({ info }) => {
  const { isHigher, value, title, unit } = info;

  return (
    <div className={ isHigher ? 'InfoCard win' : 'InfoCard' }>
      <div className="InfoCard-cardTitle">{title}</div>
      <div className="InfoCard-cardContent">{value+unit}</div>
    </div>
  );
};

InfoCard.propTypes = {
  info: PropTypes.object.isRequired
};

export default InfoCard;