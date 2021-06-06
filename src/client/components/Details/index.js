import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { fetchVideoDetails } from '../../services/videos';

const Details = (props) => {
  const { id } = useParams();
  const location = useLocation();

  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('item su id', id);

  useEffect(() => {
    console.log('yooooo');
    let _id = id;
    if (!id) {
      _id = location.pathname.split("/")[1];
    }
    console.log('----_id', _id)
    fetchVideoDetails({id: _id}).then((item) => {
      if (item) {
        console.log('item su ', item);
        setVideoData(item);
        setLoading(false)
      }

    });
  }, []);

  const renderThumbnails = (thumbNails) => {
    const thumbs = Object.keys(thumbNails).map((key) => {
      return <li>
        <img src={thumbNails[key].url} />
        <span>{key}</span>
      </li>
    });
    return thumbs
  }

  return (
    <div>
      {
        (!loading && videoData) ? (
          <div>
            {videoData.videoMetadata.title && <h3>{videoData.videoMetadata.title}</h3>}
            {videoData.player && <div dangerouslySetInnerHTML={{ __html: videoData.player.embedHtml}} width="540" height="450" />  }
            {videoData.videoMetadata.description && <p>{videoData.videoMetadata.description}</p>}
            {
              videoData.videoMetadata.thumbnails && <ul>{renderThumbnails(videoData.videoMetadata.thumbnails)}</ul>
            }
            {
              videoData.statistics ? (
                <ul>
                  <li><span>viewCount: </span>{videoData.statistics.viewCount}</li>
                  <li><span>dislikes: </span>{videoData.statistics.dislikeCount}</li>
                  <li><span>likeCount: </span>{videoData.statistics.likeCount}</li>
                </ul>
              ) : null
            }
          </div>
        ) : <p>Loading...</p>
      }
    </div>
  )

}

Details.displayName = "Details";
export default Details;
