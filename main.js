const { app, BrowserWindow } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 850,
        height: 1000,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})


app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
