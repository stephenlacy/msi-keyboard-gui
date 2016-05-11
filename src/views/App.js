import { Component } from 'react'
import classNames from 'classnames'
import { colors } from 'msi-keyboard/lib/constants'
import keyboard from '../lib/keyboard'
import KeyboardView from './Keyboard'
import ColorPicker from './ColorPicker'

module.exports = class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      on: true,
      tip: 'Click on a region to choose a color',
      colors: {
        left: 'red',
        middle: 'blue',
        right: 'green'
      }
    }
  }

  componentDidMount () {
    if (keyboard.stack) {
      this.setState({error: keyboard.message})
    }
  }

  handleColors (opts) {
    this.setState({
      colors: Object.assign(this.state.colors, opts),
      choose: null
    })
  }

  setKeyboard (regions) {
    for (const k in regions) {
      if (!regions[k]) return
      keyboard.color(k, {
        color: regions[k],
        intensity: 'high'
      })
    }
  }

  handleColorClick (region) {
    this.setState({choose: region})
  }
  toggleOn () {
    this.setState({on: !this.state.on}, () => {
      if (!this.state.on) {
        return this.setKeyboard({
          left: 'black',
          middle: 'black',
          right: 'black'
        })
      }
      this.setKeyboard(this.state.colors)
    })
  }

  handleColor (color, num) {
    let obj = {}
    obj[this.state.choose] = color
    obj.choose = null
    this.handleColors(obj)
  }

  close () {
    this.setState({choose: null})
  }

  // setMode () {
  //   keyboard.mode('breathe', this.state.colors)
  // }

  render () {
    let errorEl
    if (this.state.error) {
      errorEl = <div className='modal-component'>
        <div className='modal-content'>
          <h2> Error </h2>
          <pre className='error'>
            {this.state.error}
          </pre>
          <br />
          Did you try using sudo?
        </div>
      </div>
    }

    let ColorEl = <ColorPicker
      className={this.state.choose ? 'active' : null}
      close={() => this.close()}
      handleColor={(k, v) => this.handleColor(k, v)}
      region={this.state.choose} />

    return <div className='index-component'>
      {errorEl}
      {ColorEl}
      <div
        title={this.state.on ? 'on' : 'off'}
        onClick={() => this.toggleOn()}
        className={classNames('button toggle', {
        active: this.state.on
      })}>
        <div className='handle' />
      </div>

      <div className='tips-component'>
        {this.state.tip}
      </div>

      <KeyboardView
        initialColors={this.state.colors}
        handleColorClick={(e) => this.handleColorClick(e)}
        handleColors={(e) => this.handleColors(e)}/>

      <div className='vert-line' />

      <button
        onClick={() => this.setKeyboard(this.state.colors)}
        className='button submit'>
        set colors
        </button>
    </div>
  }
}
