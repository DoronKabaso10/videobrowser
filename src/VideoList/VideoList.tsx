import React from "react";
import { VideoCard, VideoItem } from "./VideoCard";
import "./VideoList.css";

interface VideoListProps {
  videos: VideoItem[];
}

export const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  if (videos.length === 0) {
    return <div className="no-videos-found">No videos were found :-(</div>;
  } else {
    const renderVideos = (videos: VideoItem[]) => {
      return videos.map((video) => (
        <VideoCard key={video.id} videoItem={video} />
      ));
    };
    return <div className="video-list">{renderVideos(videos)}</div>;
  }
};
