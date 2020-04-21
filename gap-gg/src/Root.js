import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import stores from 'stores';

const Root = () => {
  return (
    <Provider>
      <BrowserRouter store={stores}>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
