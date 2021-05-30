const mongoose = require('mongoose');
const Schema = mongoose.Schema

const videosSchema = new Schema({
    videoId: String, // youtube data id
    videoMetadata: {
        publishedAt: String,
        channelId: String,
        title: String,
        description: String,
        thumbnails: {
            default: {
                url: String,
                width: Number,
                height: Number
            },
            medium: {
                url: String,
                width: Number,
                height: Number
            },
            high: {
                url: String,
                width: Number,
                height: Number
            },
            standard: {
                url: String,
                width: Number,
                height: Number
            },
            channelTitle: String,
            categoryId: String,
            liveBroadcastContent: String,
            localized: {
                title: String,
                description: String
            },
            defaultAudioLanguage: String
        }
    },
    contentDetails: {
        duration: String,
        dimension: String,
        definition: String,
        caption: String,
        licensedContent: Boolean,
        contentRating: {},
        projection: String
    },
    statistics: {
        viewCount: String,
        likeCount: String,
        dislikeCount: String,
        favoriteCount: String,
        commentCount: String
    }
}, { safe: true, timestamps: true })


const Video = mongoose.model('Video', videosSchema)
module.exports = Video;
