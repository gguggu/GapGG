import React from 'react';
import PropTypes from 'prop-types';
import './TierCard.scss';

const TierCard = ({ tierData, tierSrc, tierType }) => {
  const { leaguePoints, losses, rank, tier, wins } = tierData;

  return (
    <div className="TierCard">
      <img src={tierSrc}/>
      <div className="TierCard-contentWrap">
        <div className="TierCard-contentWrap-queueType">{tierType}</div>
        {
          tier === 'UNRANK' ? <div className="TierCard-contentWrap-tier">Unranked</div>
            : <> <div className="TierCard-contentWrap-tier">{tier} {rank}</div>
            <div className="TierCard-contentWrap-point">{leaguePoints}LP</div>
            <div className="TierCard-contentWrap-winlose">{wins}승 {losses}패</div> </>
        }
      </div>
    </div>
  );
};

TierCard.propTypes = {
  tierData: PropTypes.object.isRequired,
  tierSrc: PropTypes.string.isRequired,
  tierType: PropTypes.string.isRequired
};

export default TierCard;