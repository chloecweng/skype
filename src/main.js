import { Menu, app, BrowserWindow, ipcMain, screen } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

if (started) {
  app.quit();
}

let mainWindow;

ipcMain.on("show-context-menu", (event, contactId) => {
  const template = [
    { label: "Call" },
    { label: "Video Call" },
    { label: "Chat" },
    { label: "Send File..." },
    { label: "View Profile" },
    { label: "Rename" },
    { label: "Add to Group >" },
    { label: "Remove from Contacts" },
    { type: "separator" },
    {
      label: "Block this User",
      click: () => {
        event.sender.send("block-user-command", contactId);
      },
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup({ window: win });
});

ipcMain.on("open-add-contact-window", () => {
  const addContactWin = new BrowserWindow({
    width: 753,
    height: 393, // Decreased
    modal: true,
    resizable: true, // Allow resizing to fit content
    minimizable: true,
    maximizable: false, // Disables the 'square' maximize button
    fullscreenable: false, // Prevents accidental full-screen mode
    useContentSize: true,
    parent: BrowserWindow.getFocusedWindow(),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  // Check if we are in Development using the same variable as your mainWindow
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // Development: Use the dev server URL + the hash route
    addContactWin.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/add-contact`);
  } else {
    // Production: Use the same path logic as your mainWindow + the hash
    // We use MAIN_WINDOW_VITE_NAME here because it's the folder name Vite creates
    addContactWin.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      {
        hash: "add-contact",
      },
    );
  }
});

// Handle window resize requests from AddContactPage
ipcMain.on("resize-add-contact-window", (event, { width, height }) => {
  const addContactWin = BrowserWindow.fromWebContents(event.sender);
  if (addContactWin) {
    addContactWin.setSize(width, height, true);
  }
});

// Handle contact addition from AddContactPage
ipcMain.on("add-contact", (event, contactData) => {
  // Send to main window to update contacts list
  const mainWindow = BrowserWindow.getAllWindows().find(
    (win) => !win.isModal(),
  );
  if (mainWindow) {
    mainWindow.webContents.send("contact-added", contactData);
  }
});

ipcMain.on("open-call-window", () => {
  createCallWindow();
});

ipcMain.on("open-blocked-window", () => {
  const blockedWin = new BrowserWindow({
    width: 753,
    height: 396,
    modal: true,
    resizable: true, // Allow resizing to fit content
    minimizable: true,
    maximizable: false, // Disables the 'square' maximize button
    fullscreenable: false, // Prevents accidental full-screen mode
    useContentSize: true,
    parent: BrowserWindow.getFocusedWindow(),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    blockedWin.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/blocked`);
  } else {
    blockedWin.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      {
        hash: "blocked",
      },
    );
  }
});

ipcMain.on("unblock-contact", (event, data) => {
  console.log("MAIN PROCESS: Received unblock signal");
  const mainWin = BrowserWindow.getAllWindows().find((win) => !win.isModal());
  if (mainWin) {
    mainWin.webContents.send("contact-unblocked", data);
    console.log("MAIN PROCESS: Signal relayed to StartPage");
  } else {
    console.error("MAIN PROCESS ERROR: No main window found!");
  }
});

ipcMain.on("answer-video-call", (event, callData) => {
  console.log("Received answer-video-call:", callData);

  const allWindows = BrowserWindow.getAllWindows();
  console.log("All windows:", allWindows.length);

  // Find the main window (not modal, not the call popup)
  const mainWindow = allWindows.find(
    (win) => win.webContents !== event.sender && !win.isModal(),
  );

  console.log("Main window found:", !!mainWindow);

  if (mainWindow) {
    mainWindow.webContents.send("video-call-answered", callData);
    mainWindow.focus();
    mainWindow.show();
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1158,
    height: 860,
    icon: path.join(__dirname, '../assets/windowicon.png'),  // or correct path from built main.js
    minWidth: 800,
    minHeight: 500,
    useContentSize: true, // Ensures the 1158x682 is the actual drawing area
    resizable: true,
    frame: true, // Default native title bar
    transparent: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.on("close", (e) => {
    console.log("Main window is trying to close");
  });

  mainWindow.on("closed", () => {
    console.log("Main window closed");
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

function createCallWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  const callWindow = new BrowserWindow({
    width: 506,
    height: 147,
    x: Math.round((screenWidth - 506) / 2),
    y: Math.round((screenHeight - 137) / 2),
    frame: false,
    modal: true,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    callWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#/call-popup`);
  } else {
    callWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
      {
        hash: "call-popup",
      },
    );
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
