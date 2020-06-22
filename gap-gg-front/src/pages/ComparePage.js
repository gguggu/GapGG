import React from 'react';
import CompareContainer from 'containers/Compare';
import PageTemplate from 'components/common/PageTemplate';

const ComparePage = () => {
  return (
    <PageTemplate type='compare'>
      <CompareContainer/>
    </PageTemplate>
  );
};

export default ComparePage;