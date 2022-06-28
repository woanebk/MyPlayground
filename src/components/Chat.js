import { AddOutlined, CardGiftcard, EmojiEmotions, Gif } from '@mui/icons-material'
import React from 'react'
import "../App.css"
import ChatHeader from './ChatHeader'
import Message from './Message'

function Chat() {
  return (
    <div className='chat'>
      <ChatHeader/>

      <div className="chat__messages">
        <Message name='Woanebk'/>
      </div>

      <div className="chat__input" >
        <AddOutlined className='grey white_hover'/>
        <form>
          <input type={'text'} placeholder={'Messeage #CHAT'}/>
          <button className='chat__inputButton' type={'submit'}>Send</button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard className='grey white_hover'/>
          <Gif className='grey white_hover'/>
          <EmojiEmotions className='grey white_hover'/>
        </div>
      </div>
    </div>
  )
}

export default Chat