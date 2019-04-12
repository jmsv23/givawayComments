import React, { Component } from 'react'
import styles from './styles/Comment.module.scss'

export default class Comment extends Component {
  render() {
    const { name, text } = this.props
    return (
      <div className={styles.wrapper}>
        <h1>{name}</h1>
        <p>{text}</p>
      </div>
    )
  }
}
