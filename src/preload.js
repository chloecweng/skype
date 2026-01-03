// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openAddContactWindow: () => ipcRenderer.send('open-add-contact-window'),
  addContact: (contactData) => ipcRenderer.send('add-contact', contactData),
  onContactAdded: (callback) => {
    ipcRenderer.on('contact-added', (event, contactData) => callback(contactData));
  },
  removeContactAddedListener: () => {
    ipcRenderer.removeAllListeners('contact-added');
  },
  resizeWindow: (width, height) => {
    ipcRenderer.send('resize-add-contact-window', { width, height });
  }
});