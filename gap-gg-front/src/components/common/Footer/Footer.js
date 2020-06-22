import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-box">
        <div className="Footer-box-title">© GAP.GG. All Rights Reserved</div>
        <div className="Footer-box-desc">
          gap.gg isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  
};

export default Footer;