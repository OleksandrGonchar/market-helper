import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import './App.css';

import { Authorization } from './utils/auth';
const login = lazy(() => import('./components/login/login'));
const ItemLIst = lazy(() => import('./components/item-list/item-list'));

function App() {

  return (
    <Router>
      <Suspense fallback={<div>Download...</div>}>
        <Switch>
          <Route exact path="/" component ={login}/>

          <Route exact path="/list" component={Authorization(ItemLIst)}/>
          
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
