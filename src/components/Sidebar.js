import React, { useEffect, useState } from 'react'
import "../App.css"
import { ExpandMore, Add, SignalCellularAlt, InfoOutlined, Call, Headset, MicOutlined, Settings } from '@mui/icons-material'
import SidebarChannel from './SidebarChannel'
import { Avatar } from '@mui/material'
import {useSelector } from "react-redux";
import db, { auth } from '../firebase'
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore'

function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "channels"), (snapshot) => {
      const listChannel = snapshot?.docs?.map((doc)=>{
        const docId = doc.id;
        return {...doc.data(), ...{channelId: docId}}
      })
      setChannels(listChannel)
  });
  },[])

  const logOut = () => {
    auth.signOut().then(() => {
      alert('Sign out Successful')
    }).catch((error) => {
      alert('Sign out Unsuccessful')
    });
  }

  const handleAddChannel = async () => {
    const channelName = prompt('Enter a channel name')
    if (channelName){
      try {
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
          timeStamp : serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

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
            <Add onClick={handleAddChannel} className="sidebar__addChannel"/>
          </div>
          <div className="channel__List ">
            {channels?.map((item, index)=>(
            <SidebarChannel key={index} channel={item}></SidebarChannel>
            ))}
          </div>
        </div>

        <div className="sidebar__voice flex ">
          <SignalCellularAlt className='sidebar__voiceIcon sidebar--active' fontSize='large'/>
          <div className="sidebar__voiceInfo">
            <h3 className='sidebar--active'>Voice Connected</h3>
            <p>Stream</p>
          </div>
          <div className="sidebar__voiceIcons flex col">
            <InfoOutlined className='pointer' />
            <Call className='pointer' />
          </div>
        </div>

        <div className="sidebar__profile flex">
          <Avatar className='pointer' onClick={logOut} src={user?.photoURL}/>
          <div className="sidebar__profileInfo">
            <h3>{user?.displayName}</h3>
            <p>#{user?.uid.substring(0,8)}</p> 
          </div>

          <div className="sidebar__profileIcons flex col">
            <MicOutlined className='pointer ' />
            <Headset className='pointer' />
            <Settings className='pointer' />
          </div>
        </div>
    </div>
  )
}

export default Sidebar