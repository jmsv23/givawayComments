const env = require('node-env-file')
const fetch = require('node-fetch')

env(__dirname + '/.env')

const url = 'https://www.googleapis.com/youtube/v3/commentThreads'
const apiKey = process.env.API_KEY || ''
const format = 'plainText'
const part = 'snippet'
const videoId = 'u_vXGrrzIiQ'

fetch(`${url}?key=${apiKey}&textFormat=${format}&part=${part}&videoId=${videoId}`)
.then((response) => {
  return response.json()
})
.then((data) => {
  return console.log(data)
})
.catch((error) => {
  console.log(error)
})
