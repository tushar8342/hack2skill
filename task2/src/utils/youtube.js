const { google } = require('googleapis');
const  youtubeApiKey  = "AIzaSyCNAWvFSiXNBkZlP4DPtpqaYoroKNGj7ZY"

const youtube = google.youtube({
  version: 'v3',
  auth: youtubeApiKey,
});

async function fetchLatestVideos(searchQuery) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      order: 'date',
      maxResults: 10,
    });

    const videos = response.data.items.map((item) => {
      const {
        title,
        description,
        publishedAt,
        thumbnails,
      } = item.snippet;

      return {
        title,
        description,
        publishingDate: new Date(publishedAt),
        thumbnailUrls: Object.values(thumbnails).map((thumb) => thumb.url),
      };
    });

    return videos;
  } catch (err) {
    console.error('Error fetching videos from YouTube:', err);
    return [];
  }
}

module.exports = { fetchLatestVideos };