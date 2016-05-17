import { Component } from 'react'
import classNames from 'classnames'

module.exports = class KeyboardView extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.setState(this.props.initialColors)
  }

  render () {
    return <div className='keyboard-component'>
      <div className={classNames('keyboard', {
        off: !this.props.on
      })}>
        <div
          className='region left'
          style={{
            background: this.props.initialColors.left
          }}
          onClick={() => this.props.handleColorClick('left')} />

        <div
          className='region middle'
          style={{
            background: this.props.initialColors.middle
          }}
          onClick={() => this.props.handleColorClick('middle')} />

        <div
          className='region right'
          style={{
            background: this.props.initialColors.right
          }}
          onClick={() => this.props.handleColorClick('right')} />

      </div>
    </div>
  }
}
