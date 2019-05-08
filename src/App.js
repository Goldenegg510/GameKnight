import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import router from './router'


import './App.css';

function App() {
  return (
    <Provider>
      <HashRouter>
        {router}
      </HashRouter>
    </Provider>
  );
}

export default App;
