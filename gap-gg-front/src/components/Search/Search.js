import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';
import Loader from 'components/common/Loader';

const Search = ({ isPending, summoner, getProfile, matchItem, tierItem, handleUpdateSummoner }) => {
  const { name, summonerLevel, profileIconId } = summoner;
  const src = profileIconId && getProfile(profileIconId);
  return (
    <>
      {
        isPending ? <Loader/> : 
          <div className="Search">
            <div className="Search-top">
              <div className="Search-top-imgWrap">
                <img src={src} alt="userIcon"/>
                <div className="Search-top-imgWrap-level">{summonerLevel}</div>
              </div>
              <div className="Search-top-midWrap">
                <div className="Search-top-midWrap-name">{name}</div>
                <button onClick={handleUpdateSummoner}>갱신</button>
              </div>
              <div className="Search-top-tierWrap">
                {tierItem}
              </div>
            </div>
            <div className="Search-middle">
              {matchItem}
            </div>
          </div>
        }
    </>
  );
};

Search.propTypes = {
  isPending: PropTypes.bool.isRequired,
  summoner: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  matchItem: PropTypes.array.isRequired,
  tierItem: PropTypes.array.isRequired,
  handleUpdateSummoner: PropTypes.func.isRequired
};

export default Search;