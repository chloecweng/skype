import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

ipcMain.on('open-add-contact-window', () => {
  const addContactWin = new BrowserWindow({
    width: 753,
    height: 393, // Decreased
    modal: true,
    resizable: true,      // Allow resizing to fit content
    minimizable: true,
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

// Handle window resize requests from AddContactPage
ipcMain.on('resize-add-contact-window', (event, { width, height }) => {
  const addContactWin = BrowserWindow.fromWebContents(event.sender);
  if (addContactWin) {
    addContactWin.setSize(width, height, true);
  }
});

// Handle contact addition from AddContactPage
ipcMain.on('add-contact', (event, contactData) => {
  // Send to main window to update contacts list
  const mainWindow = BrowserWindow.getAllWindows().find(win => !win.isModal());
  if (mainWindow) {
    mainWindow.webContents.send('contact-added', contactData);
  }
});

ipcMain.on('open-call-window', () => {
  createCallWindow();
});

ipcMain.on('answer-video-call', (event, callData) => {
  console.log('Received answer-video-call:', callData);
  
  const allWindows = BrowserWindow.getAllWindows();
  console.log('All windows:', allWindows.length);
  
  // Find the main window (not modal, not the call popup)
  const mainWindow = allWindows.find(win => 
    win.webContents !== event.sender && !win.isModal()
  );

  console.log('Main window found:', !!mainWindow);

  if (mainWindow) {
    mainWindow.webContents.send('video-call-answered', callData);
    mainWindow.focus();
    mainWindow.show();
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

  mainWindow.on('close', (e) => {
    console.log('Main window is trying to close');
  });

  mainWindow.on('closed', () => {
    console.log('Main window closed');
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

function createCallWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  const callWindow = new BrowserWindow({
    width: 506,
    height: 147,
    x: Math.round((screenWidth - 506) / 2),
    y: Math.round((screenHeight - 137) / 2),
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    callWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/call-popup`);
  } else {
    callWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`), {
      hash: 'call-popup'
    });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
