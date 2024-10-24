const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let users = []; // Массив для хранения пользователей

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Обработка добавления пользователя
ipcMain.handle('add-user', (event, user) => {
    users.push(user); // Добавляем пользователя в массив
    return users;     // Возвращаем обновленный список
});

// Обработка получения всех пользователей
ipcMain.handle('get-users', () => {
    return users;
});
