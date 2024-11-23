import React from "react";
import "../styles/videocard.css";

const VideoCard = ({ thumbnail, title, channel, views, time }) => {
  return (
    <div className="video-card">
      <img src={thumbnail} alt={title} className="video-thumbnail" />
      <div className="video-info">
        <h4 className="video-title">{title}</h4>
        <p className="video-channel">{channel}</p>
        <p className="video-meta">
          {views} views • {time}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
