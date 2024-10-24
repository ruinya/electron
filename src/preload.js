const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    addUser: (user) => ipcRenderer.invoke('add-user', user),
    getUsers: () => ipcRenderer.invoke('get-users')
});
