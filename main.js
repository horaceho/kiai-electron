const { app, BrowserWindow, Menu, MenuItem } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    frame: true,
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

const menu = new Menu()
menu.append(new MenuItem({
  label: '気合 Kiai',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Cmd+I' : 'Alt+I',
    click: () => { console.log(process.platform === 'darwin' ? '⌘+I' : '⌥+I') }
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
