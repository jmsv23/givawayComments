import React, { Component } from 'react'
import ReactDom from 'react-dom'
import fetch from 'node-fetch'

import SearchBar from './components/SearchBar/SearchBar'
import Comment from './components/Comment/Comment'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoId: '',
      comments: []
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
      }
    } else {
      return {};
    }
  }

  searchComments = () => {
    const { videoId } = this.state;
    fetch('/get-comments/' + videoId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.items) {
          var content = []
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
        <SearchBar placeholder="Video Id" />
        <label>Video id:</label>
        <input value={videoId} onChange={this.inputChange} />
        <button onClick={this.searchComments}>buscar comentarios</button>
        <div>
          {comments.map((comment, key) => <Comment name={comment.name} text={comment.text} />)}
        </div>
      </div>
    )
  }
}

const container = document.getElementById('app')

ReactDom.hydrate(<App />, container)
