'use strict';

const { BrowserWindow } = require('electron');

const defaultProps = {
  width: 500,
  height: 800,
  show: false,
};

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }) {
    //cals new BrowserWindow with these props
    super({ ...defaultProps, ...windowSettings });

    this.loadFile(file);
    this.webContents.openDevTools();

    this.show();

    // this.once('read-to-show', () => {
    //   this.show();
    // });
  }
}

module.exports = Window;
