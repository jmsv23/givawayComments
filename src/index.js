import React, { Component } from 'react'
import ReactDom from 'react-dom'
import fetch from 'node-fetch'
import moment from 'moment'
import { Button, Card, Image, Grid, Header, Icon, Segment, Message, Comment as CommentUI } from 'semantic-ui-react'
import SearchBar from './components/SearchBar/SearchBar'
import Comment from './components/Comment/Comment'

console.log(Comment)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      modalError: false,
      ejecutarFuncion: false,
      video: null
      }
  }

  inputChange = (e) => {
    const { value } = e.target;
    this.setState({ videoId: value })
  }

  getContent = (item) => {
    if (item.snippet && item.snippet.topLevelComment && item.snippet.topLevelComment.snippet) {
      var comment = item.snippet.topLevelComment.snippet
      return {
        avatar: comment.authorProfileImageUrl,
        name: comment.authorDisplayName,
        text: comment.textDisplay,
        published: comment.publishedAt,
      }
    } else {
      return {};
    }
  }

  getVideoID = (url) => {
    const regex = /.*youtube\.com.*v=(.+)|[&].*?/
    const matches = url.match(regex)

    if (!matches) return false;

    return matches[1]
  }

  searchComments = (videoId) => {
    fetch('/get-comments/' + videoId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.items) {
          let content = []
          data.items.forEach((item, key) => {
            content.push(this.getContent(item))
          });
          this.setState({ comments: content })
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }

  searchData = (videoId) => {
    fetch('get-video-data/' + videoId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
          if(data.items[0].snippet) {
            const video = {
              imagenVideo: data.items[0].snippet.thumbnails.high.url,
              tituloVideo: data.items[0].snippet.title,
              fechaSubido: data.items[0].snippet.publishedAt
            }
            this.setState({ video })
          }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onChange = (url) => {
    const videoId = this.getVideoID(url)
    if(videoId) {
      this.searchData(videoId)
    }  else {
      this.setState({ video: null })
    }
  }

  onCLick = (url) => {
    const videoId = this.getVideoID(url)

    if (!videoId) {
      return this.setState({ modalError: true })
    } else {
      this.setState({ modalError: false })
    }
    this.searchComments(videoId)
  }

  cerrarVentana = () => (this.setState({ modalError: False }))

  render() {
    const { comments, modalError, ejecutarFuncion, video} = this.state
    return (
      <div>
        <Segment placeholder inverted>
          <Header icon>
            <Icon name='search' />
            Copia la url del video que deseas obtener los comentarios.
          </Header>
          <Segment.Inline>
            <SearchBar placeholder="Url de Youtube" onClick={this.onCLick} onChange={this.onChange}/>
          </Segment.Inline>
          {modalError && (
            <Message negative>
              <Message.Header>Introduce una url valida</Message.Header>
            </Message>
          )}
        </Segment>
        {video && (
          <Grid centered>
            <Card>
              <Image src={video.imagenVideo} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{video.tituloVideo}</Card.Header>
                <Card.Meta>
                  <span className='date'>{moment(video.fechaSubido).fromNow()}</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Grid>
        )}
        <Grid centered>
          <CommentUI.Group>
            {comments.map((comment) => (
              <Comment
                name={comment.name}
                text={comment.text}
                avatar={comment.avatar}
                published={comment.published}
              />
            ))}
          </CommentUI.Group>
        </Grid>
      </div>
    )
  }
}
const container = document.getElementById('app')

ReactDom.hydrate(<App />, container)
