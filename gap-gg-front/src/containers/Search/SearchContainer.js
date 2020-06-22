import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Search from 'components/Search';
import { withRouter } from 'react-router-dom';
import usePending from 'lib/usePending';

const SearchContainer = ({ store, history }) => {
  const { summoner, searchSummoner, getProfile } = store.summoner;

  const requestInitialData = useCallback(async() => {
    const path = history.location.pathname;
    const summonerName = path.split('search/').pop();

    await searchSummoner(summonerName).catch(err => alert('소환사 검색 에러'));
  }, [searchSummoner]);

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    getFunction();
  }, []);

  return <Search isPending={isPending} summoner={summoner} getProfile={getProfile}/>;
};

SearchContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default inject('store')(observer(withRouter(SearchContainer)));