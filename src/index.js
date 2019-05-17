import React, { Component } from 'react'
import ReactDom from 'react-dom'
import fetch from 'node-fetch'
import { Grid, Header, Icon, Segment, Comment as CommentUI } from 'semantic-ui-react'
import SearchBar from './components/SearchBar/SearchBar'
import Comment from './components/Comment/Comment'

console.log(Comment)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoId: '',
      comments: [],
    }
  }

  inputChange = (e) => {
    const { value } = e.target;
    this.setState({ videoId: value })
  }

  getContent = (item) => {
    if (item.snippet && item.snippet.topLevelComment && item.snippet.topLevelComment.snippet) {
      var comment = item.snippet.topLevelComment.snippet;
      return {
        name: comment.authorDisplayName,
        text: comment.textDisplay,
        avatar: comment.authorProfileImageUrl,
        published: comment.publishedAt,
      }
    } else {
      return {};
    }
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

  render() {
    const { videoId, comments } = this.state
    return (
      <div>
        <Segment placeholder inverted>
          <Header icon>
            <Icon name='search' />
            Ingresa el videoId y obten los comentarios del video.
          </Header>
          <Segment.Inline>
            <SearchBar placeholder="Video Id" onClick={this.searchComments}/>
          </Segment.Inline>
        </Segment>
        <Grid centered>
          <CommentUI.Group>
            {comments.map((comment, key, avatar, published) => (
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
