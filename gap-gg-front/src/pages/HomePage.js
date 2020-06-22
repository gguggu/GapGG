import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import HomeContainer from 'containers/Home';

const HomePage = () => {
  return (
    <PageTemplate type='home'>
      <HomeContainer/>
    </PageTemplate>
  );
};

export default HomePage;