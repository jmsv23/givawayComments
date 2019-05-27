import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react'

export default class SearchBar extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Search...',
    onClick: () => {},
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  onClick = () => {
    const {
      input,
    } = this.state
    this.props.onClick(input)
  }

  onChange = (e) => {
    this.setState({ input: e.target.value })
    this.props.onChange(e.target.value)
  }

  render() {
    const {
      placeholder,
    } = this.props
    return (
      <Input
       onChange={this.onChange}
       placeholder={placeholder}
       action={{
         icon: 'search',
         color: 'teal',
         onClick: this.onClick,
       }}
      />
    )
  }
}
