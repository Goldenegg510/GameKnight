import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Group from './components/Group/Group'


export default (
  <Switch>
    <Route exact path='/' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/group-page' component={Group} />
  </Switch>
)