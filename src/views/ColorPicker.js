import { Component } from 'react'
import classNames from 'classnames'
import { colors } from 'msi-keyboard/lib/constants'

module.exports = class ColorPicker extends Component {
  renderColor (k) {
    let v = colors[k]
    return <div
      style={{
        background: k
      }}
      key={k}
      onClick={() => this.props.handleColor(k, v)}
      className='color' />
  }
  render () {
    const ourClass = classNames('color-picker-component', this.props.className)
    return <div
      className={ourClass}>
      <div
        onClick={() => this.props.close()}
        className='button close'>×</div>
      {
        Object.keys(colors).map((k) => this.renderColor(k))
      }
      </div>
  }
}
