import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Groups from './components/Groups'
import Group from './components/Group'
import Profile from './components/Profile'


export default (
  <Switch>
    <Route exact path='/' component={Register} />
    <Route path='/login' component={Login} />
    <Route path='/groups' component={Groups} />
    <Route path='/group/:id' component={Group} />
    <Route path='/profile' component={Profile} />
  </Switch>
)