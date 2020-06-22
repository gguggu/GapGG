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
  const [dbEvent, setDbEvent] = useState(false); // 소환사 이름 중복 이벤트 처리

  const requestInitialData = useCallback(async() => {
    await getChampion().then(async() => {
      await getRotaition().catch(err => {
        alert('rotation 에러 발생');
      });
    }).catch(err => {
      alert('champion 에러 발생');
    });

  }, [getChampion, getRotaition]);

  const [isPending, getFunction] = usePending(requestInitialData);

  useEffect(() => {
    getFunction();
  }, []);

  const handleSummonerName = e => {
    const { value } = e.target;
    setName(value);
  }

  const handleSummonerBtn = async(e) => {
    if(!dbEvent){
      setDbEvent(true);
      const processedName = name.replace(/(\s*)/g, "");
      await searchSummoner(processedName).then(() => {
        setDbEvent(false);
        history.push(`/search/${processedName}`);
      }).catch(err => {
        alert('이름 에러');
        setDbEvent(false);
      });
    }
  }

  const rotationItem = rotation && rotation.map((data, idx) => {
    return (
      <RotationCard image={data} idx={idx} key={idx}/>
    )
  });

  return <Home isPending={isPending} rotationItem={rotationItem} 
  handleSummonerName={handleSummonerName} handleSummonerBtn={handleSummonerBtn}/>
};

HomeContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default inject('store')(observer(withRouter(HomeContainer)));