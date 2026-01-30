// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openAddContactWindow: () => ipcRenderer.send("open-add-contact-window"),
  openBlockedWindow: () => ipcRenderer.send('open-blocked-window'),
  addContact: (contactData) => ipcRenderer.send("add-contact", contactData),
  onContactAdded: (callback) => {
    ipcRenderer.on("contact-added", (event, contactData) =>
      callback(contactData)
    );
  },
  removeContactAddedListener: () => {
    ipcRenderer.removeAllListeners("contact-added");
  },
  resizeWindow: (width, height) => {
    ipcRenderer.send("resize-add-contact-window", { width, height });
  },
  openCallWindow: () => ipcRenderer.send("open-call-window"),
  answerVideoCall: (callData) => ipcRenderer.send("answer-video-call", callData), // Add callData parameter

  onVideoCallAnswered: (callback) => {
    ipcRenderer.on("video-call-answered", (event, data) => callback(data));
  },

  removeVideoCallListener: () => {
    ipcRenderer.removeAllListeners("video-call-answered");
  },

  unblockContact: (signal) => ipcRenderer.send("unblock-contact", signal),

  onContactUnblocked: (callback) => {
    const listener = (event, data) => callback(data);
    ipcRenderer.on("contact-unblocked", listener);
    return () => ipcRenderer.removeListener("contact-unblocked", listener);
  },

  showContextMenu: (contactId) => ipcRenderer.send("show-context-menu", contactId),
  onBlockCommand: (callback) => {
    const subscription = (event, contactId) => callback(contactId);
    ipcRenderer.on("block-user-command", subscription);
    return () => ipcRenderer.removeListener("block-user-command", subscription);
  },
});
