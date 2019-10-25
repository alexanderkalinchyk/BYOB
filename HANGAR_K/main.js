const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 3840,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Open the DevTools.
  win.webContents.openDevTools();

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(`file://${__dirname}/index.html`);
}

app.on("ready", createWindow);
