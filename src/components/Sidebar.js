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
  MicOffOutlined,
  CallEndOutlined,
  CallMissedOutlined,
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
import { selectChannel, setChannel, setIsLoading } from "../features/appSlice";
import Search from "./Search";
import { getRandomBackgroundImages } from "../utilities/Utilities";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import MenuButton from "./MenuButton";

function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const channel = useSelector(selectChannel);
  const [channels, setChannels] = useState([]);
  const [channelIdInput, setChannelIdInput] = useState("");
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const dispatch = useDispatch();

  const config = { mode: "rtc", codec: "vp8" };
  const appId = "9a32fec06f9b484d9e28e86115a422f1";
  const token =
    "0069a32fec06f9b484d9e28e86115a422f1IAD3viFxMUJqIBoPXAG6nCcsRmHnqSwrVJn4UWvSkxExaGTNKL8AAAAAEACQKMvtzNnTYgEAAQCj2dNi";
  const name = "main";
  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

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

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio") {
          // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
          const remoteAudioTrack = user.audioTrack;
          // Play the remote audio track.
          remoteAudioTrack.play();
        }
      });

      client.on("user-unpublished", async (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        // Unsubscribe from the tracks of the remote user.
        await client.unsubscribe(user);
      });

      client.on("user-left", async (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        // Unsubscribe from the tracks of the remote user.
        await client.unsubscribe(user);
      });
    };
    if (ready && tracks) {
      try {
        init("main");
      } catch (error) {
        console.log(error);
      }
    }
  }, [channel?.channelId, client, ready, tracks]);

  const handleClickMic = async () => {
    if (microphoneEnabled) {
      await endVoiceCall()
    } else {
      if (channel?.channelId) {
        setMicrophoneEnabled(true);
        //await client.join(appId, name, token, user?.uid);
        await client.join(appId, name, token, null);
        // Publish the local audio tracks to the RTC channel.
        await client.publish([tracks[0], tracks[1]]);

        console.log("publish success!");
      }
    }
  };

  const endVoiceCall = async () => {
    setMicrophoneEnabled(false);
    await client.leave();
    //
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
  }

  const getChannels = async () => {
    const res = await getDocs(collection(db, "channels"));
    const listChannel = res?.docs?.map((doc) => {
      const docId = doc.id;
      return { ...doc.data(), ...{ channelId: docId } };
    });

    const listFilteredChannels = await filterListChannelAssignedToUser(
      user?.uid,
      listChannel
    );
    setChannels(listFilteredChannels);
  };

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
        dispatch(
          setChannel({
            channelId: channelIdInput,
            channelName: channelExist?.channelName,
            imageURL: channelExist?.imageURL,
          })
        );
        await getChannels();
        setChannelIdInput("");
        alert("Joined channel");
      } else alert("Channel doesnt exist");
    }
  };

  const getExistingChannel = async (id) => {
    const docSnap = await getDoc(doc(db, "channels/" + id));
    return docSnap.data();
  };

  const handleAddChannel = async () => {
    const channelName = prompt("Enter a channel name");
    if (channelName) {
      try {
        dispatch(setIsLoading(true))
        const randomImg = await getRandomBackgroundImages();
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
          timeStamp: serverTimestamp(),
          imageURL: randomImg,
        });
        console.log("Channel added with ID: ", docRef.id);
        await assignUserToChannel(user?.uid, docRef.id);
        dispatch(setIsLoading(false))
      } catch (e) {
        console.error("Error adding channel: ", e);
        dispatch(setIsLoading(false))
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
        <MenuButton/>
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
            <SidebarChannel onChangeChannel={endVoiceCall} key={index} channel={item}></SidebarChannel>
          ))}
        </div>
      </div>

      <div className="sidebar__voice flex ">
        <SignalCellularAlt
          className={"sidebar__voiceIcon " + (microphoneEnabled && "sidebar--active")}
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3 className={ microphoneEnabled && "sidebar--active"}>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons flex col">
          <div onClick={handleClickMic}>
            {microphoneEnabled ? (
              <MicOutlined className="pointer " />
            ) : (
              <MicOffOutlined className="pointer" />
            )}
          </div>
        </div>
      </div>

      <div className="sidebar__profile flex">
        <Avatar className="pointer" onClick={logOut} src={user?.photoURL} />
        <div className="sidebar__profileInfo">
          <h3>{user?.displayName}</h3>
          <p>#{user?.uid.substring(0, 8)}</p>
        </div>

        <div className="sidebar__profileIcons flex col">
          <InfoOutlined className="pointer" />
          <Settings className="pointer" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
