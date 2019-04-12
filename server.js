const env = require('node-env-file')
env(__dirname + '/.env')
const express = require('express')
const app = express()

/************************
***** Custom Requires ***
*************************/
const getComments = require('./utility/getComments')

/************************
*** App configuration ***
*************************/

// Static files folder.
app.use(express.static('build'))

// Set the the views directory.
app.set('views', './views')

// Define the template engine.
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  return res.render('index', {})
})

app.get('/react', (req, res) => {
  return res.render('react', {})
})

app.get('/get-comments/:videoId', (req, res) => {
  const { videoId } = req.params
  getComments(videoId)
  .then(data => {
    return res.json(data)
  })
  .catch(e => {
    return res.json({ status: 'error' })
  })
})

app.listen(process.env.APP_PORT || 3000, () => console.log(`Express it\'s listening on port ${process.env.APP_PORT || 3000}`))
