const electron = require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

//working global variable! defines a var then gives its value!
global.sharedObj = {responseGrabbed: "Initialized global variable"};

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({
<<<<<<< HEAD
    width: 1000,
    height: 700,
=======
    width: 900,
    height: 600,
>>>>>>> 1f9429e22d84e223e2aa84095f08c8feea00aaa6
    minWidth: 900,
    minHeight: 600,
    'node-integration': false});
  //change user agent for streaming videos so its enabled by server side hehe
  var ses = mainWindow.webContents.session;
  var filter = {
    urls: ["http://*"]
  };
  //when we do finally get the response link we will still be identifying as SMP
  ses.webRequest.onBeforeSendHeaders(filter, function(details, callback) {
<<<<<<< HEAD
    details.requestHeaders['User-Agent'] = "electronNexusFramework";
=======
    details.requestHeaders['User-Agent'] = "Nexus Framework";
>>>>>>> 1f9429e22d84e223e2aa84095f08c8feea00aaa6
    callback({cancel: false, requestHeaders: details.requestHeaders});
  });
  //define the download path for downloaded videos
  ses.setDownloadPath(".\\Downloads")
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));

  mainWindow.setMenu(null);
  if(process.env.NODE_ENV == 'development'){
    //enable dev tools
    //mainWindow.webContents.openDevTools();
  }

  //this handles the redirect information from the server we request data from
  mainWindow.webContents.on('will-navigate', function (event, newUrl) {
      console.log(newUrl);
  });

  //on page load execute javascript code here
  mainWindow.webContents.on('dom-ready', () => {
   mainWindow.webContents.executeJavaScript("");
})

  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });
});