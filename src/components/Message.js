import { Avatar } from '@mui/material'
import React from 'react'

function Message({avatarURL, name, content, timeStamp}) {
  return (
    <div className='chat__message'>
      <Avatar src='https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/290314218_177277924670036_5848974514530198771_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0debeb&_nc_ohc=_LOl9Jb-fooAX8oOJD3&_nc_ht=scontent.fhan4-2.fna&oh=00_AT9uHWIJ0KIm262WXapngRaL55fGWiPMw6GIw6seYnEcSw&oe=62BFC0AB'/>
      <div className="chat__messageInfo">
        <h4>{name}<span className='chat__messageTimeStamp'>27/08/2000</span></h4>
        <p>asdasdasdasd</p>
      </div>
    </div>
  )
}

export default Message
