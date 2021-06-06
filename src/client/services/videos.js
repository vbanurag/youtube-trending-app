const axios = require('axios');

import { BaseApiUrl, VideosUrl } from '../constants';

export const fetchVideos = async (params) => {
    const url = `${BaseApiUrl}${VideosUrl.fetchVideos}`;
    console.log('url for fetch', url);

    return axios.get(url).then((response) => {
        console.log("request success", response);
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}

export const listVideos = async (params) => {
    const url = `${BaseApiUrl}${VideosUrl.list}`

    return axios.get(url).then((response) => {
        console.log("request success", response);
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}

export const listMoreVideos = async (params) => {
    const url = `${BaseApiUrl}${VideosUrl.list}`

    return axios.post(url, {
        offset: params.offset,
        limit: params.limit,
    }).then((response) => {
        console.log("request success", response);
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}

export const fetchVideoDetails = async (params) => {
    let url = `${BaseApiUrl}${VideosUrl.details}`;
    console.log('params ghdfjghsdfghsldhglskd', params);
    url += ('id' in params) ? params.id : '';

    return axios.get(url).then((response) => {
        console.log("request success", response);
        return response.data.data;
    }).catch((error) => {
        console.log("request failed", error);
    });
}