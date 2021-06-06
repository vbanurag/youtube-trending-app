import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { listVideos, listMoreVideos } from '../../services/videos';

import './index.css'; 

const List = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    listVideos().then((items) => {
      let videoList = [];
      if (items && items.length) {
        videoList = items.map((video, index) => {
          console.log('video is: ',video)
          return <Link to={`/details/${video.videoId}`} key={index}>{video.videoMetadata ? video.videoMetadata.title : ""}</Link>
        });
        setVideos(videoList);
      }
    });
  }, []);

  const fetchMoreVideos = () => {
    console.log('ayp i got clicked');

    listMoreVideos({
      offset: videos.length ? videos.length : 0,
      limit: 10,
    }).then((items) => {
      let videoList = [];
      if (items && items.length) {
        videoList = items.map((video, index) => {
          console.log('video is: ',video)
          return <Link to={`/details/${video.videoId}`} key={index}>{video.videoMetadata ? video.videoMetadata.title : ""}</Link>
        });
        setVideos(videoList);
      }
    });
  }

  return (
    <div>
      {
        (videos && videos.length) ? (
          <div>
            <ul>{videos}</ul>
            <button onClick={fetchMoreVideos}>More videos</button>
          </div>
        ) : null
      }
    </div>
  )

}

List.displayName = "List";
export default List;
