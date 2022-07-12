import React from 'react'
import { useDispatch } from 'react-redux'
import '../App.css'
import { setChannel } from '../features/appSlice';
function SidebarChannel({channel}) {
  const dispatch = useDispatch();

  const handleSetChannel = () => {
    dispatch(setChannel({
      channelId: channel?.channelId,
      channelName: channel?.channelName
    }))
  }

  return (
    <div className='sidebar__channel ' onClick={handleSetChannel}>
      <h4><span className='sidebarChannel__hash'> #</span>{channel?.channelName}</h4>
    </div>
  )
}

export default SidebarChannel
