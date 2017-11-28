'use strict';

let mainWindow;
process.on('uncaughtException', function (e) {
  console.error(e);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.openDevTools();
  }
});

const path = require('path');
const electron = require('electron');

const app = electron.app;
require('electron-debug')({ enabled: true });

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

app.on('window-all-closed', function() {
  app.quit();
});
