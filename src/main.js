import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

ipcMain.on('open-add-contact-window', () => {
  const addContactWin = new BrowserWindow({
    width: 753,
    height: 398,
    modal: true,
    resizable: false,      // Prevents the user from dragging the edges
    maximizable: false,    // Disables the 'square' maximize button
    fullscreenable: false, // Prevents accidental full-screen mode
    useContentSize: true,
    parent: BrowserWindow.getFocusedWindow(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  });

  // Check if we are in Development using the same variable as your mainWindow
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // Development: Use the dev server URL + the hash route
    addContactWin.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/add-contact`);
  } else {
    // Production: Use the same path logic as your mainWindow + the hash
    // We use MAIN_WINDOW_VITE_NAME here because it's the folder name Vite creates
    addContactWin.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`), {
      hash: 'add-contact'
    });
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1158,
    height: 682,
    useContentSize: true, // Ensures the 1158x682 is the actual drawing area
    resizable: false,     // Keeps the UI perfect for the camera
    frame: false,         // Removes the standard window border
    transparent: true,    // Allows our CSS Aero glass effect to work
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
