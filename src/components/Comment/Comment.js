import React, { Component } from 'react'
import { Comment as CommentUI, Grid } from 'semantic-ui-react'
import moment from 'moment'

export default class Comment extends Component {
  render() {
    const { name, text, published, avatar } = this.props
    return (
      <CommentUI>
        <CommentUI.Avatar src={avatar} />
        <CommentUI.Content>
          <CommentUI.Author as='a'>{name}</CommentUI.Author>
          <CommentUI.Metadata>
            <div>{moment(published).fromNow()}</div>
          </CommentUI.Metadata>
          <CommentUI.Text>{text}</CommentUI.Text>
        </CommentUI.Content>
      </CommentUI>
    )
  }
}
