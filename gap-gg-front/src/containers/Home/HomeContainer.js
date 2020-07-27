import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Home from 'components/Home/Home';
import usePending from 'lib/usePending';
import RotationCard from 'components/Home/RotationCard';
import { withRouter } from 'react-router-dom';

const HomeContainer = ({ store, history }) => {
  const { getRotaition, getChampion, rotation } = store.champion;
  const { searchSummoner } = store.summoner;

  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [dbEvent, setDbEvent] = useState(false); // 소환사 이름 중복 이벤트 처리
  const [searchType, setSearchType] = useState(0);

  const requestInitialData = useCallback(async() => {
    await getChampion()
    .catch(err => alertError('champion', err));

    await getRotaition()
    .catch(err => alertError('rotation', err));

  }, [getChampion, getRotaition]);

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    getFunction();
  }, []);

  const handleSummonerName = e => {
    const { value } = e.target;
    setName(value);
  }

  const handleSummonerSubName = e => {
    const { value } = e.target;
    setSubName(value);
  }

  const handleSearchType = e => {
    const { value } = e.target;
    setSearchType(parseInt(value));
    resetName();
  }

  const resetName = () => {
    setName('');
    setSubName('');
  }

  const handleSummonerBtn = async() => {
    if(name.trim() === ''){
      alert('이름을 입력해주세요.');
      return;
    }
    if(!dbEvent){
      setDbEvent(true);
      const processedName = name.replace(/(\s*)/g, "");

      await searchSummoner(processedName, '')
      .then(() => {
        setDbEvent(false);
        history.push(`/search/${processedName}`);
      })
      .catch(err => {
        alertError('summoner', err);
        setDbEvent(false);
      });
    }
  }

  const handleSummonerCompareBtn = async() => {
    if(name.trim() === '' || subName.trim() === ''){
      alert('이름을 입력해주세요.');
      return;
    }
    if(!dbEvent){
      setDbEvent(true);
      const processedName = name.replace(/(\s*)/g, "");
      const processedSubName = subName.replace(/(\s*)/g, "");

      let isError = false;

      await searchSummoner(processedName, '')
      .catch(err => {
        alertError('summoner', err);
        setDbEvent(false);
        isError = true;
      });

      if(isError)
        return;

      await searchSummoner(processedSubName, 'sub')
      .then(() => {
        setDbEvent(false);
        history.push(`/compare/${processedName}-${processedSubName}`);
      })
      .catch(err => {
        alertError('summoner', err);
        setDbEvent(false);
      });
    }
  }

  const alertError = (type, err) => {
    if(type === 'champion'){
      alert('챔피언 조회 에러');
      return;
    }

    if(type === 'summoner'){
      alert(`소환사 전적 조회 ${err.message}`);
      return;
    }

    if(type === 'rotation'){
      alert(`로테이션 조회 에러  ${err.message}`);
      return;
    }
  }

  const rotationItem = rotation && rotation.map((data, idx) => {
    return (
      <RotationCard image={data} idx={idx} key={idx}/>
    )
  });

  return <Home isPending={isPending} rotationItem={rotationItem} 
  handleSummonerName={handleSummonerName} handleSummonerBtn={handleSummonerBtn}
  searchType={searchType} handleSearchType={handleSearchType} 
  handleSummonerCompareBtn={handleSummonerCompareBtn}
  handleSummonerSubName={handleSummonerSubName}/>;
};

HomeContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default inject('store')(observer(withRouter(HomeContainer)));