import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react'

export default class SearchBar extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Search...',
  }

  render() {
    const {
      placeholder,
    } = this.props;
    return (
      <div>
        <Input icon='search' placeholder={placeholder} />
        <Button positive>Buscar Comentarios</Button>
      </div>
    )
  }
}
