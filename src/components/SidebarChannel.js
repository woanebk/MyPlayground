import {
  CopyAllOutlined,
  ShareOutlined,
  ShareRounded,
} from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import { setChannel } from "../features/appSlice";
import {CopyToClipboard} from "../utilities/Utilities"
import { ToastContainer, toast } from 'react-toastify';
function SidebarChannel({ channel }) {
  const dispatch = useDispatch();

  const handleSetChannel = () => {
    dispatch(
      setChannel({
        channelId: channel?.channelId,
        channelName: channel?.channelName,
      })
    );
  };

  const handleCopyId = (e) => {
    e.stopPropagation();
    toast(channel?.channelId);
    CopyToClipboard(channel?.channelId);
  };

  return (
    <div className="sidebar__channel " onClick={handleSetChannel}>
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
