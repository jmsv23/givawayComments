import React, { Component } from 'react'
import moment from 'moment'
import { Comment as CommentUI } from 'semantic-ui-react'

export default class Comment extends Component {
  render() {
    const { avatar, name, text, published } = this.props
    return (
      <CommentUI>
        <CommentUI.Avatar src={avatar} />
        <CommentUI.Content>
          <CommentUI.Author as='a'>{name}</CommentUI.Author>
          <CommentUI.Metadata>
            <div>{moment(published).format('Do MM/YYYY')}</div>
          </CommentUI.Metadata>
          <CommentUI.Text>{text}</CommentUI.Text>
        </CommentUI.Content>
      </CommentUI>
    )
  }
}
