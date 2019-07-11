const fetch = require('node-fetch')
const url = 'https://www.googleapis.com/youtube/v3/commentThreads'

const getComments = (url) => {
  const apiKey = process.env.API_KEY || ''
  const format = 'plainText'
  const part = 'snippet'
  const videoId = 'u_vXGrrzIiQ'
  return fetch(`${url}?key=${apiKey}&textFormat=${format}&part=${part}&videoId=${videoId}`)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.log(error)
    return null
  })
}

getComments(url)
.then(data => console.log(data))
