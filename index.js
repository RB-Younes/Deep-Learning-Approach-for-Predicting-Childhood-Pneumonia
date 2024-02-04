const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');


app.whenReady().then(() => {
	const win = new BrowserWindow({show: false,frame: false,
		webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
			nodeIntegration:true,
			
    },
		icon: 'icons/add.png'
		
		
	});
	win.maximize();
	win.show();
	

	win.loadFile('menu.html');
	win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
 
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})

