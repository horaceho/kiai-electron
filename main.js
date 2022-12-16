const { app, BrowserWindow, ipcMain, Menu, MenuItem, nativeTheme } = require('electron')
const fs = require('fs');
const path = require('path')
const { template } = require('./menu')

const createWindow = () => {
  const win = new BrowserWindow({
    frame: true,
    width: 1200,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

  win.on('resize', () => {
    // console.log(win.getSize())
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  createWindow()

  ipcMain.handle('getFileStat', (event, path) => {
    return fs.statSync(path)
  })

  ipcMain.handle('ping', () => 'PONG')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
