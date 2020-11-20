// public/electron.ts
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev')
const path = require('path') 

// 1. Gabage Collection이 일어나지 않도록 함수 밖에 선언함.
let mainWindow = BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    center: true,
    fullscreen: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 3. and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});