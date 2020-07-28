import React from 'react';
import PropTypes from 'prop-types';
import HOMELOGO from 'assets/images/GapLogo_white.png';
import './Home.scss';
import Loader from 'components/common/Loader';

const Home = ({ isPending, rotationItem, handleSummonerName, handleSummonerBtn,
  searchType, handleSearchType, handleSummonerCompareBtn, handleSummonerSubName }) => {
  return (
    <>
    {
      isPending ? <Loader/>
        : 
      <div className="Home">
        <img src={HOMELOGO} alt="homeLogo"/>
        <div className="Home-inputArea">
          {
            searchType === 1 ? 
            <div className="Home-inputArea-compareInput">
              <label className="Home-inputArea-compareInput-searchWrap">
                <div className="Home-inputArea-compareInput-searchWrap-inputs">
                  <input placeholder="비교할 소환사명1" onChange={handleSummonerName} onKeyUp={e => {
                    if(e.keyCode === 13)
                      handleSummonerCompareBtn();
                  }}/>
                  <input placeholder="비교할 소환사명2" className="bottom" onChange={handleSummonerSubName} onKeyUp={e => {
                    if(e.keyCode === 13)
                      handleSummonerCompareBtn();
                  }}/>
                </div>
                <button onClick={handleSummonerCompareBtn}>검색</button>
              </label>
            </div>
              : <label className="Home-inputArea-searchWrap">
              <input placeholder="소환사명" onKeyUp={e => {
                if(e.keyCode === 13)
                  handleSummonerBtn();
              }} onChange={handleSummonerName}/>
              <button onClick={handleSummonerBtn}>검색</button>
            </label>
          }
          <div className="Home-inputArea-typeWrap">
            <label>
              전적검색
              <input type="radio" value='0' name="searchType" onChange={handleSearchType} checked={searchType === 0 ? true : false}/>
              <span></span>
            </label>
            <label>
              전적비교
              <input type="radio" value='1' name="searchType" onChange={handleSearchType} checked={searchType === 1 ? true : false}/>
              <span></span>
            </label>
          </div>
        </div>
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
  handleSummonerBtn: PropTypes.func.isRequired,
  searchType: PropTypes.number.isRequired,
  handleSearchType: PropTypes.func.isRequired,
  handleSummonerCompareBtn: PropTypes.func.isRequired,
  handleSummonerSubName: PropTypes.func.isRequired
};

export default Home;