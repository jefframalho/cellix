// Versão Windows do Cellix (Electron) — abre o mesmo index.html como programa.
const { app, BrowserWindow, shell } = require('electron');

function criarJanela() {
  const win = new BrowserWindow({
    width: 1366,
    height: 820,
    minWidth: 1000,
    minHeight: 640,
    backgroundColor: '#0b0f17',
    autoHideMenuBar: true,
    title: 'Cellix',
    webPreferences: { contextIsolation: true }
  });
  win.loadFile('index.html');
  win.maximize();
  // links do WhatsApp abrem no navegador padrão
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(criarJanela);
app.on('window-all-closed', () => app.quit());
