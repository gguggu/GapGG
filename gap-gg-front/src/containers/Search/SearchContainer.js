import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Search from 'components/Search';
import { withRouter } from 'react-router-dom';
import usePending from 'lib/usePending';
import { VERSION } from 'config/config.json';
import MatchCard from 'components/Search/MatchCard';
import useTierImage from 'lib/useTierImage';
import TierCard from 'components/Search/TierCard';

const SearchContainer = ({ store, history }) => {
  const { summoner, detailMatches, searchMatch, getQueue, getSummonerTier,
    searchSummoner, searchMatchList, getProfile, getSpell, spells, tier } = store.summoner;
  const { compareChampion, getChampion } = store.champion;

  const requestInitialData = useCallback(async() => {
    const path = history.location.pathname;
    const summonerName = path.split('search/').pop();

    await searchSummoner(summonerName)
    .catch(err => alert('소환사 검색 에러'));

    await getSummonerTier()
    .catch(err => alert('소환사 티어 검색 에러'));

    await getQueue()
    .catch(err => alert('큐 조회 에러'));

    await searchMatchList()
    .catch(err => alert('소환사 전적 에러'));

    await searchMatch()
    .catch(err => alert('소환사 개별 전적 에러'));

    await getChampion()
    .catch(err => alert('챔피언 조회 에러'));

    await getSpell()
    .catch(err => alert('소환사 스펠 조회 에러'));
    
  }, [searchSummoner, searchMatchList, searchMatch, getChampion, getQueue, getSpell, getSummonerTier]);

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    getFunction();
  }, []);

  const handleUpdateSummoner = async() => {
    const path = history.location.pathname;
    const summonerName = path.split('search/').pop();
    
    await searchSummoner(summonerName)
      .catch(err => alert('소환사 검색 에러'));
  
    await getSummonerTier()
    .catch(err => alert('소환사 티어 검색 에러'));
  
    await getQueue()
    .catch(err => alert('큐 조회 에러'));
  
    await searchMatchList()
    .catch(err => alert('소환사 전적 에러'));
  
    await searchMatch()
    .catch(err => alert('소환사 개별 전적 에러'));
  
    await getChampion()
    .catch(err => alert('챔피언 조회 에러'));
  
    await getSpell()
    .catch(err => alert('소환사 스펠 조회 에러'));
  }

  const matchItem = detailMatches.map((data, idx) => {
    const { champion } = data;
    const championName = compareChampion(champion);
    const src = `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${championName}.png`;
    return <MatchCard matchData={data} src={src} summoner={summoner} spells={spells} champions={store.champion.champion} key={idx}/>;
  });

  const tierItem = tier.map((data, idx) => {
    const { tier, queueType } = data;
    const tierSrc = useTierImage(tier);
    let tierType = '';

    if(queueType === 'RANKED_SOLO_5x5')
      tierType = '솔로랭크';

    if(queueType === 'RANKED_FLEX_SR')
      tierType = '5:5 자유랭크';

    return <TierCard tierData={data} tierSrc={tierSrc} tierType={tierType} key={idx}/>;
  });

  return <Search isPending={isPending} summoner={summoner} getProfile={getProfile} matchItem={matchItem} tierItem={tierItem} handleUpdateSummoner={handleUpdateSummoner}/>;
};

SearchContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default inject('store')(observer(withRouter(SearchContainer)));