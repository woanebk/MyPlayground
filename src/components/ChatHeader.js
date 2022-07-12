import { EditLocation, HelpCenterRounded, HelpOutline, NotificationAdd, PeopleAlt, SendRounded } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'
import { selectChannel } from '../features/appSlice'
import Search from './Search'

function ChatHeader({onHelpClick}) {

  const channel = useSelector(selectChannel);
  return (
    <div className='chatHeader'>
      <div className="chatHeader__left grey">
        <h3><span className='chatHeader__hash'># </span> {channel?.channelName}</h3>
      </div>

      <div className="chatHeader__right">
        <NotificationAdd className='grey pointer white_hover'/>
        <EditLocation className='grey pointer white_hover'/>
        <PeopleAlt className='grey pointer white_hover'/>
        <Search/>   
        <SendRounded className='grey pointer white_hover'/>
        <HelpOutline onClick={onHelpClick} className='grey pointer white_hover'/>
      </div>
    </div>
  )
}

export default ChatHeader
