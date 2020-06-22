import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import SearchContainer from 'containers/Search';

const SearchPage = () => {
  return (
    <PageTemplate type='search'>
      <SearchContainer/>
    </PageTemplate>
  );
};

export default SearchPage;