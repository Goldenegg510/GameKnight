import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Register from './components/Home/Register'
import Group from './components/Group/Group'


export default (
  <Switch>
    <Route exact path='/' component={Register}/>
    <Route path='/group-page' component={Group}/>
  </Switch>
)