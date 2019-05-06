const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const menu = Menu.buildFromTemplate([
  {
    label: "IconMaker",
    submenu: [
      { label: "About App", selector: "orderFrontStandardAboutPanel:" },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click: function() {
          app.quit();
        }
      }
    ]
  }
]);

app.on("window-all-closed", function() {
  app.quit();
});

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  Menu.setApplicationMenu(menu);
  mainWindow.loadURL("file://" + __dirname + "/index.html");
});
