const { app, BrowserWindow, ipcMain, Menu, MenuItem, nativeTheme } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    frame: true,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')

  win.on('resize', () => {
    // console.log(win.getSize())
  })

  ipcMain.handle('help', () => 'HELP')

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
}

const menu = new Menu()
menu.append(new MenuItem({
  label: '気合 Kiai',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Alt+I',
    click: () => { console.log(process.platform === 'darwin' ? '⌘+I' : '⌥+I') }
  }, {
    role: 'quit',
    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Alt+Q',
    click: () => { app.quit() }
  }]
}))
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
