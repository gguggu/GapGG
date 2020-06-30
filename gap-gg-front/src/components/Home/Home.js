import React from 'react';
import PropTypes from 'prop-types';
import HOMELOGO from 'assets/images/GapLogo_white.png';
import './Home.scss';
import Loader from 'components/common/Loader';

const Home = ({ isPending, rotationItem, handleSummonerName, handleSummonerBtn }) => {
  return (
    <>
    {
      isPending ? <Loader/>
        : 
      <div className="Home">
        <img src={HOMELOGO} alt="homeLogo"/>
        <label className="Home-searchWrap">
          <input placeholder="소환사명" onKeyUp={e => {
            if(e.keyCode === 13)
              handleSummonerBtn();
          }} onChange={handleSummonerName}/>
          <button onClick={handleSummonerBtn}>검색</button>
        </label>
        <div className="Home-rotationBox">
          <div className="Home-rotationBox-title">오늘의 로테이션</div>
          <div className="Home-rotationBox-items">
            {rotationItem}
          </div>
        </div>
      </div>
    }
    </>
  );
};

Home.propTypes = {
  isPending: PropTypes.bool.isRequired,
  rotationItem: PropTypes.array.isRequired,
  handleSummonerName: PropTypes.func.isRequired,
  handleSummonerBtn: PropTypes.func.isRequired
};

export default Home;