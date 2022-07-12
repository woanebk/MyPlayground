import { Avatar } from '@mui/material'
import React from 'react'

function Message({avatarURL, name, content, timeStamp}) {
  return (
    <div className='chat__message'>
      <Avatar src={avatarURL || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png'}/>
      <div className="chat__messageInfo">
        <h4>{name}<span className='chat__messageTimeStamp'>{timeStamp}</span></h4>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default Message
