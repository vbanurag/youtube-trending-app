const axios = require('axios');
const Promise = require('bluebird');
const VideoModel = require('./videos.model');
const PageModel = require('./token.model');


const fetchVideo = async (pageStart = 10, _token) => {
    try {
        let items = [];
        //find page token
       
        if (!_token.length) {
            const token = await PageModel.findOne({ length: pageStart }).lean().exec();
           
            _token = token ? token.nextPageToken : ''
        }
    
        
        const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails,statistics,player',
                chart: 'mostPopular',
                regionCode: 'IN',
                key: 'AIzaSyDy-sXXii2tJLyynOG2n0LBF4IBaVxoEJw',
                maxResults: 10,
                pageToken: _token
            }
        });

        if (data) {
            items = data.items.map(i => {
                i['videoMetadata'] = i.snippet;
                i['videoId'] = i.id;
                return i;
            });
            const isExist = await PageModel.findOne({ nextPageToken: data.nextPageToken || '' }).lean().exec();
           
            if (!isExist) {
                await PageModel.insertMany([{ nextPageToken: data.nextPageToken || '', length: data.pageInfo.resultsPerPage + pageStart }]);
                
            }
        }
       
        let dataToPush = [];
        await Promise.mapSeries(items, async (item) => {
            const isVideoExists = await VideoModel.findOne({ videoId: item.videoId }).exec();
            if (!isVideoExists) {
                dataToPush.push(item)
            }
            return Promise.resolve()
        })
        await VideoModel.insertMany(dataToPush);
        return Promise.resolve({
            message: 'done',
        })
    } catch (err) {
        console.log(err);
        return Promise.reject({
            message: err.message,
        })
    }
}

const listVideos = async (req, res) => {
    try {
        const page = req.body.data.page || 1;
        const limit = req.body.data.limit || 10;
        const token = req.body.data.nextPageToken || '';
        const count = await VideoModel.countDocuments();
        let list = await VideoModel.find({}, {}, { skip: (page - 1) * limit, limit }).exec();
        if (!list.length) {
            await fetchVideo(count, token);
            list = await VideoModel.find({}, {}, { skip: (page - 1) * limit, limit }).exec();
           
        }
        const _token = PageModel.findOne({ length: (page - 1) * limit }).lean().exec();

        return res.json({
            message: 'done',
            data: list,
            nextPageToken: _token
        });
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
}

const fetchVideoDetails = async (req, res) => {
    
    try {
        const id = req.params.id || '';

        if (!id.trim().length) {
            return res.json({
                message: 'Invalid id',
                data: [],
            })
        }
        // "video title", "description",
        // "video URL", "video thumbnail" in all available sizes, "video view count",
        // "likes" and "dislike" count, channel title, channel description, channel
        // thumbnail in all available sizes and channel subscribers.
        const data = await VideoModel.findOne({ videoId: id }, 'videoMetadata statistics player')

        if (data) {
            return res.json({
                message: 'done',
                data,
            })
        }
        return res.json({
            message: 'Error',
            data: [],
        })
        // console.log('data', data);
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
}

module.exports = {
    listVideos: listVideos,
    fetchVideoDetailsByID: fetchVideoDetails,
}