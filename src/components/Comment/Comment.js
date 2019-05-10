import React, { Component } from 'react'
import { Comment as CommentUI } from 'semantic-ui-react'


export default class Comment extends Component {
  render() {
    const { name, text, published, avatar } = this.props
    return (
      <CommentUI>
        <CommentUI.Avatar src={avatar} />
        <CommentUI.Content>
          <CommentUI.Author as='a'>{name}</CommentUI.Author>
          <CommentUI.Metadata>
            <div>{published}</div>
          </CommentUI.Metadata>
          <CommentUI.Text>{text}</CommentUI.Text>
        </CommentUI.Content>
      </CommentUI>
    )
  }
}
