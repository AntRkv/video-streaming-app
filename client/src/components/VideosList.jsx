import React from "react";
import VideoCard from "./VideoCard";
import "../styles/videoslist.css";

const VideosList = ({ videos }) => {
  return (
    <div className="videos-list">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          thumbnail={video.thumbnail}
          title={video.title}
          channel={video.channel}
          views={video.views}
          time={video.time}
        />
      ))}
    </div>
  );
};

export default VideosList;
