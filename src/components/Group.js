import React from 'react'
import Events from './Events'
import Message from './Message'
import Header from './Header'


export default function Group(props) {
  return (
    <div>
      <Header/>
      <Events group_id={props.match.params.id} />
      <Message />
    </div>
  )
}