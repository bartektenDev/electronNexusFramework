const electron = require('electron');
const path = require('path');
const url = require('url');

//electron squirrel for release
// Module to control application life. (this variable should already exist)
const app2 = electron.app

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app2)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}
//anything above is for install

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
    width: 900,
    height: 600,
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
    details.requestHeaders['User-Agent'] = "Sigma media player v2.1 29i8IPIFmAViSQfi";
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

//for install
function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};
