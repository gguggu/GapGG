import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

const Search = ({ isPending, summoner, getProfile }) => {
  const { name, summonerLevel, profileIconId } = summoner;
  const src = getProfile(profileIconId);
  return (
    <>
      {
        isPending ? <>loading</> : 
          <div className="Search">
            <div className="Search-top">
              <div className="Search-top-imgWrap">
                <img src={src} alt="userIcon"/>
                <div className="Search-top-imgWrap-level">{summonerLevel}</div>
              </div>
              <div className="Search-top-midWrap">
                <div className="Search-top-midWrap-name">{name}</div>
                <button>갱신</button>
              </div>
            </div>
            <div className="Search-middle">

            </div>
          </div>
        }
    </>
  );
};

Search.propTypes = {
  isPending: PropTypes.bool.isRequired,
  summoner: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

export default Search;