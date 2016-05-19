import { Component } from 'react'
import classNames from 'classnames'

module.exports = class Selector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleSelector: false,
      selected: null
    }
  }

  toggleSelector (e) {
    this.setState({toggleSelector: !this.state.toggleSelector})
  }

  setSelector (selected) {
    this.setState({selected})
    this.toggleSelector()
    this.props.handleSelector(selected)
  }

  render () {
    const ourClass = classNames('selector-component', this.props.className)
    return (
      <div
        className='selector-component'>
          <div
            onClick={() => this.toggleSelector()}
            className='head'> {this.state.selected || 'Choose Mode'} </div>
            <div className={classNames('list', {
              active: this.state.toggleSelector
            })}>
            {
              this.props.items.map((item) => {
                return <div
                  key={item}
                  onClick={() => this.setSelector(item)}
                  className='item'> {item} </div>
              })
            }
        </div>
      </div>
    )
  }
}
