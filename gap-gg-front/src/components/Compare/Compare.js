import React from 'react';
import PropTypes from 'prop-types';
import './Compare.scss';
import Loader from 'components/common/Loader';
import { DDRAGON, VERSION } from 'config/config.json';

const Compare = ({ isPending, handleSearchSummoner, comparingItem, summoner,
  subSummoner, comparingSubItem }) => {
  const { name, profileIconId } = summoner;
  const summonerIconSrc = `${DDRAGON}/${VERSION}/img/profileicon/${profileIconId}.png`;
  const subSummonerIconSrc = `${DDRAGON}/${VERSION}/img/profileicon/${subSummoner.profileIconId}.png`;
  return (
    <>
      {
        isPending ? <Loader/> : 
        <div className="Compare">
          <div className="Compare-contents">
            <div className="Compare-contents-leftCtt">
              <div className="Compare-contents-leftCtt-top">
                <img src={summonerIconSrc} alt='player1profile'/>
                <div className="Compare-contents-leftCtt-top-name">{name}</div>
                {/* <div className="Compare-contents-leftCtt-top-lane">SUP 80% TOP 20%</div> */}
              </div>
              <div className="Compare-contents-leftCtt-infoList">
                {comparingItem}
              </div>
            </div>
            <div className="Compare-contents-rightCtt">
              <div className="Compare-contents-rightCtt-top">
                <img src={subSummonerIconSrc} alt='player2profile'/>
                <div className="Compare-contents-rightCtt-top-name">{subSummoner.name}</div>
                {/* <div className="Compare-contents-leftCtt-top-lane">SUP 80% TOP 20%</div> */}
              </div>
              <div className="Compare-contents-rightCtt-infoList">
                {comparingSubItem}
              </div>
            </div>
          </div>
          <div className="Compare-desc">※ 최근 플레이한 20판을 기반으로 비교한 데이터입니다.</div>
        </div>
      }
    </>
  );
};

Compare.propTypes = {
  isPending: PropTypes.bool.isRequired,
  handleSearchSummoner: PropTypes.func.isRequired,
  comparingItem: PropTypes.array.isRequired,
  comparingSubItem: PropTypes.array.isRequired
};

export default Compare;