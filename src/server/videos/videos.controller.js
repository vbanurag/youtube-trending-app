const axios = require('axios');
const VideoModel = require('./videos.model');
const PageSchema = require('../pagination/page.model');

const fetchYoutubeVideos = async (req, res) => {
    try {
        let items = [];

        const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails,statistics,player',
                chart: 'mostPopular',
                regionCode: 'IN',
                key: 'AIzaSyDy-sXXii2tJLyynOG2n0LBF4IBaVxoEJw',
                maxResults: 10,
            }
        });

        if (data) {
            items = data.items.map(i => {
                i['videoMetadata'] = i.snippet;
                i['videoId'] = i.id; 
                return i;
            })
            PageSchema.insertMany(data.items.nextPageToken).then(console.log).catch(console.log)
        }
        
        VideoModel.insertMany(items).then(console.log).catch(console.log)
        return res.json({
            message: 'done',
        })
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
}

const listVideos = (req, res) => {
    try {
        console.log('listVideos', req.query.offset, req.query.limit);
        VideoModel.find({}, {}, { skip: 0, limit: 10 }, (err, result) => {
            if (err) {
                console.log("Error in fetching deatils")
                return res.json({
                    message: err.message,
                })
              } else {
                console.log("fetching list", result);
                return res.json({
                    message: 'done',
                    data: result,
                });
              }
        });
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
}

const fetchVideoDetails = (req, res) => {
    console.log("fetching video details", req.params.id);
    try {
        const id = req.params.id;
        // "video title", "description",
        // "video URL", "video thumbnail" in all available sizes, "video view count",
        // "likes" and "dislike" count, channel title, channel description, channel
        // thumbnail in all available sizes and channel subscribers.
        VideoModel.findOne({ videoId: id }, 'videoMetadata statistics player', (err, result) => {
            if (err) {
                console.log("Error in fetching deatils")
                return res.json({
                    message: err.message,
                })
              } else {
                console.log("fetching result", result);
                return res.json({
                    message: 'done',
                    data: result,
                })
              }
        });
        // console.log('data', data);
    } catch (err) {
        console.log("Erro in fecthinggg details",err)
        return res.json({
            message: err.message,
        })
    }
}

module.exports = {
    fetchAndSaveYoutubeVideos: fetchYoutubeVideos,
    listVideos: listVideos,
    fetchVideoDetailsByID: fetchVideoDetails,
}