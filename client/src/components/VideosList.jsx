import React from "react";
import "../styles/videosList.css";

const VideosList = ({ videos }) => {
  return (
    <div className="videos-list">
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id} className="video-card">
            <video
              src={`http://localhost:3000/${video.filePath}`}
              controls
              className="video-preview"
            ></video>

            <div className="video-details">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-channel">Channel: {video.channelName}</p>
              <p className="video-date">
                Uploaded: {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default VideosList;
