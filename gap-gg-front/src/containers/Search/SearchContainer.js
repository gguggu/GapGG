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

  const [target, setTarget] = useState(null);
  let [scrollCount, setScrollCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hadError, setHadError] = useState(false);

  const requestInitialData = useCallback(async() => {
    const path = history.location.pathname;
    const summonerName = path.split('search/').pop();

    await searchSummoner(summonerName, '')
    .catch(err => alertError('summoner', err));

    await getSummonerTier()
    .catch(err => alertError('tier', err));

    await getQueue()
    .catch(err => alertError('queue', err));

    await searchMatchList(scrollCount, scrollCount + 10, '')
    .then(() => {
      setScrollCount(10);
      setHadError(false);
    })
    .catch(err => alertError('matchList', err));

    await searchMatch()
    .then(() => setHadError(false))
    .catch(err => alertError('match', err));

    await getChampion()
    .catch(err => alertError('champion', err));

    await getSpell()
    .catch(err => alertError('spell', err));
    
  }, [searchSummoner, searchMatchList, searchMatch, getChampion, getQueue, getSpell, getSummonerTier]);

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    getFunction();
  }, []);

  const onIntersect = async([entry], observer) => {
    if(entry.isIntersecting && !isLoading){
      observer.unobserve(entry.target);
      setIsLoading(true);
      await getScrollMatch();
      setIsLoading(false);
      observer.observe(entry.target);
    }
  }

  const getScrollMatch = async() => {
    await searchMatchList(scrollCount, scrollCount + 10)
    .then(() => setHadError(false))
    .catch(err => alertError('matchList', err));
    await searchMatch()
    .then(() => setHadError(false))
    .catch(err => alertError('match', err));
    await getSpell()
    .catch(err => alertError('spell', err));
    await setScrollCount(scrollCount + 10);
  }

  useEffect(() => {
    let observer;
    if(target){
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  });

  const handleUpdateSummoner = async() => {
    const path = history.location.pathname;
    const summonerName = path.split('search/').pop();
    
    await searchSummoner(summonerName, '')
      .catch(err => alertError('summoner', err));
  
    await getSummonerTier()
    .catch(err => alertError('tier', err));
  
    await getQueue()
    .catch(err => alertError('queue', err));
  
    await searchMatchList(0, scrollCount + 10)
    .then(() => {
      setScrollCount(10);
      setHadError(false);
    })
    .catch(err => alertError('matchList', err));
  
    await searchMatch()
    .then(() => setHadError(false))
    .catch(err => alertError('match', err));
  
    await getChampion()
    .catch(err => alertError('champion', err));
  
    await getSpell()
    .catch(err => alertError('spell', err));
  }

  const alertError = (type, err) => {
    if(hadError)
      return;

    if(type === 'match'){
      alert(`소환사 개별 전적 에러 ${err.message}`)
      setHadError(true);
      return;
    }

    if(type === 'matchList'){
      alert(`소환사 전적 리스트 조회 ${err.message}`);
      setHadError(true);
      return;
    }

    if(type === 'spell'){
      alert('소환사 스펠 조회 에러');
      return;
    }

    if(type === 'champion'){
      alert('챔피언 조회 에러');
      return;
    }

    if(type === 'queue'){
      alert('큐 조회 에러');
      return;
    }

    if(type === 'summoner'){
      alert(`소환사 정보 조회 ${err.message}`);
      return;
    }

    if(type === 'tier'){
      alert('소환사 티어 검색 에러');
      return;
    }
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

  return <Search setTarget={setTarget} isPending={isPending} summoner={summoner}
  getProfile={getProfile} matchItem={matchItem} tierItem={tierItem} isLoading={isLoading}
  handleUpdateSummoner={handleUpdateSummoner}/>;
};

SearchContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default inject('store')(observer(withRouter(SearchContainer)));