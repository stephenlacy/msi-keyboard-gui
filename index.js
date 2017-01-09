'use strict';

const path = require('path');
const electron = require('electron');

const app = electron.app;
require('electron-debug')({ enabled: true });

let mainWindow;

function createMainWindow () {
  const win = new electron.BrowserWindow({
    title: app.getName(),
    height: 550,
    width: 960,
    backgroundColor: '#263238',
    icon: __dirname + '/assets/logo.png'
  });
  win.loadURL('file://' + __dirname + '/src/index.html');
  win.setMenu(null);
  return win;
}
app.on('ready', function() {
  mainWindow = createMainWindow();
});
