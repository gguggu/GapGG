import React, { useCallback, useEffect, useState } from 'react';
import Compare from 'components/Compare';
import { inject, observer } from 'mobx-react';
import usePending from 'lib/usePending';
import PropTypes from 'prop-types';
import InfoCard from 'components/Compare/InfoCard';
import { withRouter } from 'react-router-dom';

const CompareContainer = ({ store, history }) => {
  const { searchSummoner, searchMatchList, searchMatch, summoner, subSummoner,
    setComparingMatch, compareSummoner } = store.summoner;

  const [comparingTotal, setComparingTotal] = useState([]);
  const [comparingSubTotal, setComparingSubTotal] = useState([]);

  const requestInitialData = useCallback(async() => {
    const path = history.location.pathname;
    const summonerName = path.split('compare/').pop().split('-');

    await searchSummoner(summonerName[0], '')
    .catch(err => alertError('summoner', err));

    await searchSummoner(summonerName[1], 'sub')
    .catch(err => alertError('summoner', err));

    await searchMatchList(0, 20, '')
    .catch(err => alertError('matchList', err));

    await searchMatchList(0, 20, 'sub')
    .catch(err => alertError('matchList', err));

    await searchMatch('')
    .catch(err => alertError('match', err));

    await searchMatch('sub')
    .catch(err => alertError('match', err));

    let comparingData = await setComparingMatch('');
    let comparingSubData = await setComparingMatch('sub');

    const [summonerData, subSummonerData] = compareSummoner(comparingData, comparingSubData);

    comparingData = summonerData;
    comparingSubData = subSummonerData;

    setComparingTotal(comparingData);
    setComparingSubTotal(comparingSubData);
  }, [searchSummoner, searchMatchList, searchMatch, setComparingMatch, setComparingTotal, setComparingSubTotal]);

  const [isPending, getFunctions] = usePending(requestInitialData);

  useEffect(() => {
    getFunctions();
  }, []);

  const handleSearchSummoner = async e => {
    const { value } = e.target;
    await searchSummoner(value, '')
    .catch(err => alertError('summoner', err));

    await searchMatchList(0, 20)
    .catch(err => alertError('matchList', err));

    await searchMatch()
    .catch(err => alertError('match', err));
  }

  const alertError = (type, err) => {
    if(type === 'match'){
      alert(`소환사 개별 전적 에러 ${err.message}`)
      return;
    }

    if(type === 'matchList'){
      alert(`소환사 전적 리스트 조회 ${err.message}`);
      return;
    }

    if(type === 'summoner'){
      alert(`소환사 정보 조회 ${err.message}`);
      return;
    }
  }

  const comparingItem = comparingTotal.map((data, idx) => {
    return <InfoCard info={data} key={idx}/>;
  });

  const comparingSubItem = comparingSubTotal.map((data, idx) => {
    return <InfoCard info={data} key={idx}/>;
  });

  return <Compare isPending={isPending} handleSearchSummoner={handleSearchSummoner}
  comparingItem={comparingItem} summoner={summoner} subSummoner={subSummoner} comparingSubItem={comparingSubItem}/>;
};

CompareContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default inject('store')(observer(withRouter(CompareContainer)));