import React from 'react';
import PropTypes from 'prop-types';
import './RotationCard.scss';

const RotationCard = ({ image, idx }) => {
  const { key, name, src } = image;

  return (
    <div className="RotationCard">
      <img src={src} alt={(idx+1) + '번째 로테이션'}/>
      <div className="RotationCard-tooltip">
        {name}
      </div>
    </div>
  );
};

RotationCard.propTypes = {
  image: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired
};

export default RotationCard;