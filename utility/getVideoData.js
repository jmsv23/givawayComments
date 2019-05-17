const env = require('node-env-file')
const fetch = require('node-fetch')
env(__dirname + '/../.env')

const getVideoData = (videoId) => {
  const url = 'https://www.googleapis.com/youtube/v3/videos'
  const apiKey = process.env.API_KEY || ''
  const part = 'id%2C+snippet'
  return fetch(`${url}?key=${apiKey}&part=${part}&id=${videoId}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return null
    })
}

module.exports = getVideoData
