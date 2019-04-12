const env = require('node-env-file')
const fetch = require('node-fetch')
env(__dirname + '/../.env')

const getComments = (videoId) => {
  const url = 'https://www.googleapis.com/youtube/v3/commentThreads'
  const apiKey = process.env.API_KEY || ''
  const format = 'plainText'
  const part = 'snippet'
  return fetch(`${url}?key=${apiKey}&textFormat=${format}&part=${part}&videoId=${videoId}`)
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
