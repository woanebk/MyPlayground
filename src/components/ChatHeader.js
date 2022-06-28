import { EditLocation, HelpCenterRounded, HelpOutline, NotificationAdd, PeopleAlt, SendRounded } from '@mui/icons-material'
import React from 'react'
import '../App.css'
import Search from './Search'

function ChatHeader() {
  return (
    <div className='chatHeader'>
      <div className="chatHeader__left grey">
        <h3><span className='chatHeader__hash'># </span> Youtube</h3>
      </div>

      <div className="chatHeader__right">
        <NotificationAdd className='grey pointer white_hover'/>
        <EditLocation className='grey pointer white_hover'/>
        <PeopleAlt className='grey pointer white_hover'/>
        <Search/>   
        <SendRounded className='grey pointer white_hover'/>
        <HelpOutline className='grey pointer white_hover'/>
      </div>
    </div>
  )
}

export default ChatHeader
