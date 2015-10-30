'use strict';
let app = require('app');
let BrowserWindow = require('browser-window');
let ipc = require('ipc');

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => process.platform != 'darwin' && app.quit());

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl(`file://${__dirname}/index.html`);
  //mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


