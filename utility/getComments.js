const env = require('node-env-file')
const fetch = require('node-fetch')
env(__dirname + '/../.env')

const getComments = (videoId, token) => {
  const url = 'https://www.googleapis.com/youtube/v3/commentThreads'
  const apiKey = process.env.API_KEY || ''
  const format = 'plainText'
  const part = 'snippet,replies'
  return fetch(`${url}?key=${apiKey}&${token ? 'pageToken=' + token + '&' : ''}textFormat=${format}&part=${part}&order=time&videoId=${videoId}`)
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

module.exports = getComments
