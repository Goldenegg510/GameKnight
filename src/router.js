import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'


export default (
  <Switch>
    <Route exact path='/' component={Header}/>
  </Switch>
)