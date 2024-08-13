import React from "react";
import "./VideoCard.css";

export interface VideoItem {
  artist: string;
  genre_id: number;
  id: number;
  image_url: string;
  release_year: number;
  title: string;
}

interface VideoProps {
  videoItem: VideoItem;
}

export const VideoCard: React.FC<VideoProps> = ({ videoItem }) => {
  return (
    <div className="video-card">
      <img src={videoItem.image_url} alt={videoItem.title} />
      <div className="video-info">
        <h3>{videoItem.title}</h3>
        <p>{videoItem.artist}</p>
        <p>{videoItem.release_year}</p>
      </div>
    </div>
  );
};
