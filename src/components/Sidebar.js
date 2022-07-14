import React, { useEffect, useState } from "react";
import "../App.css";
import {
  ExpandMore,
  Add,
  SignalCellularAlt,
  InfoOutlined,
  Call,
  Headset,
  MicOutlined,
  Settings,
} from "@mui/icons-material";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import db, { auth } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { setChannel } from "../features/appSlice";
import Search from "./Search";
import {getRandomBackgroundImages } from "../utilities/Utilities";

function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const [channels, setChannels] = useState([]);
  const [channelIdInput, setChannelIdInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "channels"), async (snapshot) => {
      const listChannel = snapshot?.docs?.map((doc) => {
        const docId = doc.id;
        return { ...doc.data(), ...{ channelId: docId } };
      });

      const listFilteredChannels = await filterListChannelAssignedToUser(
        user?.uid,
        listChannel
      );
      setChannels(listFilteredChannels);
    });
  }, []);

  const getChannels = async () => {
    const res = await getDocs(collection(db, "channels"))
    const listChannel = res?.docs?.map((doc) => {
      const docId = doc.id;
      return { ...doc.data(), ...{ channelId: docId } };
    });

    const listFilteredChannels = await filterListChannelAssignedToUser(
      user?.uid,
      listChannel
    );
    setChannels(listFilteredChannels);
  }

  const filterListChannelAssignedToUser = async (uid, listChannel) => {
    const q = query(collection(db, "users/" + uid + "/listChannels"));

    const querySnapshot = await getDocs(q);
    let listIds = [];
    querySnapshot.forEach((doc) => {
      listIds.push(doc.id);
    });
    return listChannel.filter((el) => {
      return listIds.indexOf(el.channelId) !== -1;
    });
  };

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        alert("Sign out Successful");
        dispatch(
          setChannel({
            channelId: null,
            channelName: null,
          })
        );
      })
      .catch((error) => {
        alert("Sign out Unsuccessful");
      });
  };

  const handleSearchChannel = async (e) => {
    e.preventDefault();
    if (channelIdInput) {
      const channelExist = await getExistingChannel(channelIdInput);
      if (channelExist) {
        await assignUserToChannel(user?.uid, channelIdInput);
        dispatch(setChannel({
          channelId: channelIdInput,
          channelName: channelExist?.channelName,
          imageURL: channelExist?.imageURL
        }))
        await getChannels();
        setChannelIdInput('')
        alert("Joined channel");
      } else alert("Channel doesnt exist");
    }
  };

  const getExistingChannel = async (id) => {
    const docSnap = await getDoc(doc(db, "channels/" + id));
    return docSnap.data()
  };

  const handleAddChannel = async () => {
    const channelName = prompt("Enter a channel name");
    if (channelName) {
      try {
        const randomImg = await getRandomBackgroundImages();
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
          timeStamp: serverTimestamp(),
          imageURL: randomImg
        });
        console.log("Channel added with ID: ", docRef.id);
        await assignUserToChannel(user?.uid, docRef.id);
      } catch (e) {
        console.error("Error adding channel: ", e);
      }
    }
  };

  const assignUserToChannel = async (uid, channelId) => {
    try {
      const docRef = await setDoc(
        doc(db, "users/" + uid + "/listChannels", channelId),
        {
          channelId,
          timeStamp: serverTimestamp(),
        }
      );
    } catch (e) {
      console.error("Error assign User to Channel: ", e);
    }
  };
  return (
    <div className="sidebar flex">
      <div className="sidebar__top flex">
        <h3>My Playground</h3>
        <ExpandMore />
      </div>

      <div className="sidebar__channels flex col">
        <div className="sidebar__channelsHeader flex row">
          <div className="flex row">
            <ExpandMore className="sidebar__addChannel" />
            <h4>Channels</h4>
          </div>
          <Add onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__searchChannel">
          <form>
            <Search
              placeHolder={"Enter Room Id"}
              value={channelIdInput}
              onChange={(e) => setChannelIdInput(e.target.value)}
            />
            <input
              type="submit"
              value=""
              disabled={false}
              onClick={handleSearchChannel}
              className="none-display"
            />
          </form>
        </div>
        <div className="channel__List ">
          {channels?.map((item, index) => (
            <SidebarChannel key={index} channel={item}></SidebarChannel>
          ))}
        </div>
      </div>

      <div className="sidebar__voice flex ">
        <SignalCellularAlt
          className="sidebar__voiceIcon sidebar--active"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3 className="sidebar--active">Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons flex col">
          <InfoOutlined className="pointer" />
          <Call className="pointer" />
        </div>
      </div>

      <div className="sidebar__profile flex">
        <Avatar className="pointer" onClick={logOut} src={user?.photoURL} />
        <div className="sidebar__profileInfo">
          <h3>{user?.displayName}</h3>
          <p>#{user?.uid.substring(0, 8)}</p>
        </div>

        <div className="sidebar__profileIcons flex col">
          <MicOutlined className="pointer " />
          <Headset className="pointer" />
          <Settings className="pointer" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
