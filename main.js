const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const ChildProcess = require('child_process');

const spawnThingDoer = async (seconds, tag, event) => {
    const thingDoer = ChildProcess.spawn("node", ["thing-doer.js", seconds, tag]);
    thingDoer.stdout.on('data', (data) => {
        console.log(`${data}`);
        event.reply('message', {
            data,
            tag
        })
    });
    
    thingDoer.on('close', () => {
        event.reply('close', {
            tag
        })
    })
}

// spawnThingDoer(4, "proc 1");
// spawnThingDoer(4, "proc 2");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'site/preload.js')
        }
    })

    ipcMain.on('start-doing', (event, seconds, tag) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        spawnThingDoer(seconds, tag, event);
    });


    win.loadFile('site/index.html')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
