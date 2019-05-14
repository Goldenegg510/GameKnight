import React from 'react'
import Events from './Events'
import Message from './Message'


export default function Group(props) {
  return (
    <div>
      <Events group_id={props.match.params.id} />
      <Message />
    </div>
  )
}