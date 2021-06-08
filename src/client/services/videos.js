const axios = require('axios');

import { BaseApiUrl, VideosUrl } from '../constants';

export const fetchVideos = async (params) => {
    const url = `${BaseApiUrl}${VideosUrl.fetchVideos}`;

    return axios.get(url).then((response) => {
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}

export const listVideos = async (params) => {
    const url = `${BaseApiUrl}${VideosUrl.list}`

    return axios.post(url, {
        data: {
            page: params.page || 1,
            limit: params.limit || 10,
            nextPageToken: params.nextPageToken || ''
        }
    }).then((response) => {
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}

export const listMoreVideos = async (params) => {
    const url = `${BaseApiUrl}${VideosUrl.list}`

    console.log('listMoreVideos', params, url);
    return axios.post(url, {
        data: {
            limit: params.limit,
            page: params.page,
            nextPageToken: params.nextPageToken || ''
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}

export const fetchVideoDetails = async (params) => {
    let url = `${BaseApiUrl}${VideosUrl.details}`;
    url += ('id' in params) ? params.id : '';
    return axios.get(url).then((response) => {
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}