const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  startDoing: (seconds, tag) => ipcRenderer.send('start-doing', seconds, tag),
  onMessage: (data) => ipcRenderer.on('message', data),
  onClose: (tag) => ipcRenderer.on('close', tag)
})


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }


})
