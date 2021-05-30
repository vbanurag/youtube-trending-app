const axios = require('axios');
const VideoModel = require('./videos.model');

const fetchYoutubeVideos = async (req, res) => {
    try {
        const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                key: 'AIzaSyDy-sXXii2tJLyynOG2n0LBF4IBaVxoEJw',
                maxResults: 10,
                // pageToken: ' '
            }
        });
        const items = data.items.map(i => {
            i['videoMetadata'] = i.snippet;
            return i;
          })
        VideoModel.insertMany(items).then(console.log).catch(console.log)
        console.log(data, '000')
        return res.json({
            message: 'done'
        })
    } catch (err) {
        console.log(err)
        return res.json({
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    fetchAndSaveYoutubeVideos: fetchYoutubeVideos
}