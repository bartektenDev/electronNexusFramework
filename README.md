<<<<<<< HEAD
How to install to your electron app

Step 1. Open CMD (or git) and enter: npm install electronNexusFramework

Step 2. Inside of main.js, enter the following code within 

app.on('ready', function(){

  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));

});

Step 3. Save it and close it. Then run the program using: npm start

Changes log:
---------------------
Initial Commit v 1.0.0
---------------------
=======
# electronNexusFramework
A base framework for noobs to quick start their software with electron.
>>>>>>> 3b384554b76658ebc3a3ce78f436359f18a53976
