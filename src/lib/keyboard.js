import Keyboard from 'msi-keyboard'
let keyboard

function load () {
  try {
    keyboard = Keyboard()
  }
  catch (e) {
    return e
  }
  return keyboard
}

module.exports = load()
