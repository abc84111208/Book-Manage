const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize()

const template = [
    {
        label: '一般',
        submenu: [
            { label: '關於', role: 'about' },
            { type: 'separator' },
            { label: '離開', role: 'quit' }
        ]
    },
    {
        label: '編輯',
        submenu: [
            { label: '復原', role: 'undo' },
            { label: '取消復原', role: 'redo' },
            { type: 'separator' },
            { label: '剪下', role: 'cut' },
            { label: '複製', role: 'copy' },
            { label: '貼上', role: 'paste' },
            { label: '刪除', role: 'delete' }

        ]
    },
    {
        label: '視窗',
        submenu: [
            { label: '重新載入', role: 'reload' },
            { label: '除錯工具', role: 'toggleDevTools' },
            { type: 'separator' },
            { label: '放大', role: 'zoomIn' },
            { label: '縮小', role: 'zoomOut' },
            { label: '重置大小', role: 'resetZoom' }
        ]
    },
]

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
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(null);
    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})


app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
