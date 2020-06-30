import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Search from 'components/Search';
import { withRouter } from 'react-router-dom';
import usePending from 'lib/usePending';
import { VERSION } from 'config/config.json';
import MatchCard from 'components/Search/MatchCard';

const SearchContainer = ({ store, history }) => {
  const { summoner, detailMatches, searchMatch, getQueue,
    searchSummoner, searchMatchList, getProfile, getSpell, spells } = store.summoner;
  const { compareChampion, getChampion, champion } = store.champion;

  const requestInitialData = useCallback(async() => {
    const path = history.location.pathname;
    const summonerName = path.split('search/').pop();

    await searchSummoner(summonerName)
    .catch(err => alert('소환사 검색 에러'));

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
    
  }, [searchSummoner, searchMatchList, searchMatch, getChampion, getQueue, getSpell]);

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    getFunction();
  }, []);

  const matchItem = detailMatches.map((data, idx) => {
    const { champion } = data;
    const championName = compareChampion(champion);
    const src = `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${championName}.png`;
    return <MatchCard matchData={data} src={src} summoner={summoner} spells={spells} champions={store.champion.champion} key={idx}/>;
  });

  return <Search isPending={isPending} summoner={summoner} getProfile={getProfile} matchItem={matchItem}/>;
};

SearchContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default inject('store')(observer(withRouter(SearchContainer)));