import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { listVideos, listMoreVideos } from '../../services/videos';

import './index.css';

const List = (props) => {
  const [videos, setVideos] = useState([]);
  const [value, setValue] = useState(0)
  const [nextPageToken, setNextPageToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listMoreVideos({
      limit: 10,
      page: videos.length ? (videos.length / 10) + 1 : 1
    }).then(items => {
      setVideos(items.data);
      setNextPageToken(items.nextPageToken)
      setLoading(false);
    })
  }, []);


  const fetchMoreVideos = () => {
    console.log('fetchMoreVideos from FE called')
    listMoreVideos({
      // offset: videos.length ? videos.length : 0,
      limit: 10,
      page: videos.length ? (videos.length / 10) + 1 : 1
    }).then((items) => {
      setVideos([...videos, ...items.data]);
      setNextPageToken(items.nextPageToken)
    });
  }

  if (loading) { return <div className="loading"> <div /> <div /></div> }

  return (
    <div>
      <header className="header">Trending Videos</header>
      {
        (videos && videos.length) ? (
          <div className="list">
            {
              videos.map(video => {
                return (
                  <div className="listItem">
                    <img height='160' width='220' src={video.videoMetadata ? video.videoMetadata.thumbnails.medium.url : video.videoMetadata.thumbnails.standard.url}></img>
                    <div>
                      <Link to={`/details/${video.videoId}`} key={video.videoId}>{video.videoMetadata ? video.videoMetadata.title : ""}</Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
        ) : null
      }
      <button onClick={fetchMoreVideos}>More videos</button>
    </div>
  )

}

List.displayName = "List";
export default List;
