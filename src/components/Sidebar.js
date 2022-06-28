import React from 'react'
import "../App.css"
import { ExpandMore, Add, SignalCellularAlt, InfoOutlined, Call, Headset, MicOutlined, Settings } from '@mui/icons-material'
import SidebarChannel from './SidebarChannel'
import { Avatar } from '@mui/material'

function Sidebar() {
  return (
    <div className='sidebar flex'>
        <div className="sidebar__top flex">
            <h3>My Playground</h3>
            <ExpandMore/>
        </div>

        <div className="sidebar__channels flex col">
          <div className="sidebar__channelsHeader flex row">
            <div className='flex row'>
              <ExpandMore className='sidebar__addChannel'/>
              <h4>Channels</h4>
            </div>
            <Add className="sidebar__addChannel"/>
          </div>
          <div className="channel__List ">
            <SidebarChannel></SidebarChannel>
            <SidebarChannel></SidebarChannel>
            <SidebarChannel></SidebarChannel>
            <SidebarChannel></SidebarChannel>
          </div>
        </div>

        <div className="sidebar__voice flex ">
          <SignalCellularAlt className='sidebar__voiceIcon sidebar--active' fontSize='large'/>
          <div className="sidebar__voiceInfo">
            <h3 className='sidebar--active'>Voice Connected</h3>
            <p>Stream</p>
          </div>
          <div className="sidebar__voiceIcons flex col">
            <InfoOutlined/>
            <Call/>
          </div>
        </div>

        <div className="sidebar__profile flex">
          <Avatar src='https://gamek.mediacdn.vn/133514250583805952/2021/4/30/ba3-1619756329680406498539.jpg'/>
          <div className="sidebar__profileInfo">
            <h3>asd</h3>
            <p>asda</p> 
          </div>

          <div className="sidebar__profileIcons flex col">
            <MicOutlined/>
            <Headset/>
            <Settings/>
          </div>
        </div>
    </div>
  )
}

export default Sidebar