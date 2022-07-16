import {
  CopyAllOutlined
} from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { selectChannel, setChannel } from "../features/appSlice";
import {CopyToClipboard} from "../utilities/Utilities"
import { ToastContainer, toast } from 'react-toastify';
function SidebarChannel({ channel, onChangeChannel }) {
  const dispatch = useDispatch();
  const selectedChannel = useSelector(selectChannel)

  const handleSetChannel = () => {
    onChangeChannel();
    dispatch(
      setChannel({
        channelId: channel?.channelId,
        channelName: channel?.channelName,
        imageURL: channel?.imageURL,
      })
    );
  };

  const handleCopyId = (e) => {
    e.stopPropagation();
    toast(channel?.channelId);
    CopyToClipboard(channel?.channelId);
  };

  const isSelected = channel?.channelId === selectedChannel?.channelId 

  return (
    <div className={"sidebar__channel " + (isSelected ? 'sidebar__channel--selected' : '')} onClick={handleSetChannel}>
      <h4>
        <span className="sidebarChannel__hash"> #</span>
        {channel?.channelName}
      </h4>
      <div className="sidebar__channelDetail">
        <span id={channel?.channelId} className="sidebar__channelId">
          {channel?.channelId}
        </span>
        <CopyAllOutlined
          onClick={handleCopyId}
          className="sidebar__channelId pointer"
        />
      </div>
    </div>
  );
}

export default SidebarChannel;
