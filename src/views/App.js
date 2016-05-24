import { Component } from 'react'
import classNames from 'classnames'
import { colors } from 'msi-keyboard/lib/constants'
import keyboard from '../lib/keyboard'
import KeyboardView from './Keyboard'
import ColorPicker from './ColorPicker'
import Selector from './Selector'

module.exports = class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      on: true,
      tip: 'Click on a region to choose a color',
      mode: null,
      about: false,
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

  handleSelector (mode) {
    this.setState({mode})
  }

  setKeyboard (regions, on) {
    if (on) this.setState({ on })
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

  toggleAbout () {
    this.setState({about: !this.state.about})
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

  setMode () {
    this.setState({mode: null})
    keyboard.mode(this.state.mode, {
      left: {color: this.state.colors.left},
      middle: {color: this.state.colors.middle},
      right: {color: this.state.colors.right}
    })
    if (this.state.mode === 'normal') {
      this.setKeyboard(this.state.colors)
    }
  }

  render () {
    let ErrorEl
    if (this.state.error) {
      ErrorEl = <div className='modal-component'>
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
    let AboutEl
    if (this.state.about) {
      AboutEl = <div
        onClick={() => this.toggleAbout()}
        className='modal-component'>
        <div
          onClick={(e) => e.preventDefault()}
          className='modal-content'>
          <h2> About </h2>
          https://github.com/stevelacy/msi-keyboard-gui
        </div>
      </div>
    }

    let ColorEl = <ColorPicker
      className={this.state.choose ? 'active' : null}
      close={() => this.close()}
      handleColor={(k, v) => this.handleColor(k, v)}
      region={this.state.choose} />

    return <div className='index-component'>
      {ErrorEl}
      {ColorEl}
      {AboutEl}
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
        on={this.state.on}
        initialColors={this.state.colors}
        handleColorClick={(e) => this.handleColorClick(e)}
        handleColors={(e) => this.handleColors(e)}/>

      <div className='vert-line' />

      <button
        onClick={() => this.setKeyboard(this.state.colors, true)}
        className='button submit'>
        set colors
        </button>

      <Selector
        items={[
          'breathe',
          'wave',
          'normal'
        ]}
        handleSelector={(e) => this.handleSelector(e)}
        />

      <button
        onClick={() => this.setMode()}
        style={{
          opacity: this.state.mode ? 1 : 0,
          visibility: this.state.mode ? 'visible' : 'hidden'
        }}
        className='button submit'>
        set mode
        </button>

        <div
          onClick={() => this.toggleAbout()}
          className='about-box'>
        ?
        </div>
    </div>
  }
}
