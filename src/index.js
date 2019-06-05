import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom'
import fetch from 'node-fetch'
import moment from 'moment'
import debounce from 'debounce'
import { Button, Loader, Card, Container, Grid, Header, Icon, Image, Segment, Comment as CommentUI } from 'semantic-ui-react'
import SearchBar from './components/SearchBar/SearchBar'
import Comment from './components/Comment/Comment'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      modalError: false,
      videoData: null,
      commentLoader: false,
      showMenu: false
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

  onBoxChange = (value) => {
    const videoId = this.getVideoID(value)
    if (videoId) {
      this.getVideoData(videoId)
      this.searchComments(videoId)
      this.setState({ commentLoader: true })
    } else {
      this.setState({ videoData: null, comments: [] })
    }
  }

  getVideoData = (videoId) => {
    fetch('/get-video-data/' + videoId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        return data.items
      })
      .then((items) => {
        if (items[0]) {
          const { snippet } = items[0]
          this.setState({ videoData: snippet })
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }

  searchComments = (videoId, token) => {
    fetch('/get-comments/' + videoId + (token ? '?token=' + token : ''))
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.items) {
          let content = []
          data.items.forEach((item, key) => {
            content.push(this.getContent(item))
          });
          this.setState({ comments: this.state.comments.concat(content) })
        }
        if(data.nextPageToken) {
          this.searchComments(videoId, data.nextPageToken)
        } else {
          this.setState({ 
            commentLoader: false, 
            showMenu: true 
          })
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }

  cerrarVentana = () => (this.setState({ modalError: False }))

  render() {
    const { comments, videoData, modalError, commentLoader, showMenu} = this.state
    return (
      <Fragment>
        <Segment placeholder inverted>
          <Header icon>
            <Icon name='search' />
            Copia la url del video que deseas obtener los comentarios.
          </Header>
          <Segment.Inline>
            <SearchBar placeholder="Url de Youtube" onChange={debounce(this.onBoxChange, 400)}/>
          </Segment.Inline>
          {modalError && (
            <Message negative>
              <Message.Header>Introduce una url valida</Message.Header>
            </Message>
          )}
        </Segment>
        <Container>
          <Grid centered>
            {commentLoader && (
              <Grid.Row centered>
                <Loader active inline='centered'>Loading all the comments</Loader>
              </Grid.Row>
            )}
            {videoData && (
              <Grid.Row centered columns={2}>
                <Grid.Column textAlign="center" mobile={16} computer={6} >
                  <Card.Group centered>
                    <Card>
                      <Image src={videoData.thumbnails.standard.url} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{videoData.localized.title}</Card.Header>
                        <Card.Meta>
                          <span className='date'>{moment(videoData.publishedAt).fromNow()} - {comments.length}</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Grid.Column>
                {showMenu && (
                  <Grid.Column>
                    <Button.Group>
                      <Button>Comentario al azar</Button>
                      <Button.Or />
                      <Button positive>Seleccionar comentario</Button>
                    </Button.Group>
                  </Grid.Column>                     
                )}
              </Grid.Row>
            )}
              <Grid.Column mobile={16} tablet={14} computer={10}>
                <CommentUI.Group centered>
                  {comments.map((comment) => (
                    <Comment
                      name={comment.name}
                      text={comment.text}
                      avatar={comment.avatar}
                      published={comment.published}
                    />
                  ))}
                </CommentUI.Group>
              </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    )
  }
}
const container = document.getElementById('app')

ReactDom.hydrate(<App />, container)
