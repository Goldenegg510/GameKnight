import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import router from './router'
import store from './redux/store'



function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        {router}
      </HashRouter>
    </Provider>
  );
}

export default App;
