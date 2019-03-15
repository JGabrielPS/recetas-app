const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const url = require('url');
const path = require('path');

require('./controladores/controladores generales/ConexionBd');

//Recarga de aplicacion, solo en entrono de produccion
if(process.env.ENV_DEV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

let mainWindow;
let newProductWindow;
let newProductsView;
let newRecipeWindow;
let newCoockingWindow;
let newCookingTypeWindow;
let newRateWindow;
let newResourceWindow;
let modifyProductWindow;
let ventanaConfirmacion;
let ventanaEvento = "";

app.on('ready', () => {

    // The Main Window
    mainWindow = new BrowserWindow({width: 720, height: 600});
  
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'vistas/html/ver-receta.html'),
      protocol: 'file',
      slashes: true
    }));

    createMenu();    

    mainWindow.on('close', () =>{
        app.quit();
    });
});    

//Ventanas principales

function createNewRecipeWindow() {
    newRecipeWindow = new BrowserWindow({width: 750, height: 500, title: 'Nueva Receta'});

    createDevMenu(newRecipeWindow);

    newRecipeWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ingresar-recetas.html'),
        protocol: 'file',
        slashes: true
    }));

    newRecipeWindow.on('close', () =>{
        newRecipeWindow = null;
        createMenu();
    });
};

function createNewProductsView() {
    newProductsView = new BrowserWindow({width: 680, height: 550, title: 'Todos los Productos'});

    newProductsView.setMenu(null);

    newProductsView.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ver-productos.html'),
        protocol: 'file',
        slashes: true
      }));

      createProductsMenu();

      newProductsView.on('close', () =>{
        newProductsView = null;
        createMenu();
      });
};

function createNewCookingWindow() {
    newCoockingWindow = new BrowserWindow({width: 680, height: 550, title: 'Dispositivos de coccion'});

    newCoockingWindow.setMenu(null);

    newCoockingWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ver-coccion.html'),
        protocol: 'file',
        slashes: true
      }));

      createCookingMenu();

      newCoockingWindow.on('close', () =>{
        newCoockingWindow = null;
        createMenu();
      });
};

//Crear menu principal
function createMenu(){
    addDevMenu(templateMenu);   
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
}

//Crear menues secundarios

//Crear menu de coccion
function createCookingMenu(){
    addDevMenu(coccionMenu);   
    const menuCoccion = Menu.buildFromTemplate(coccionMenu);
    Menu.setApplicationMenu(menuCoccion);
}

//Crear menu de productos
function createProductsMenu(){
    addDevMenu(productosMenu);   
    const menuProductos = Menu.buildFromTemplate(productosMenu);
    Menu.setApplicationMenu(menuProductos);
}

//Crear solo menu de desarrollo
function createDevMenu(window) {
    if (process.env.NODE_ENV !== 'production') {
        const menu = [{ label: "" }];
        addDevMenu(menu);
        const thisMenu = Menu.buildFromTemplate(menu);
        window.setMenu(thisMenu);
    }
}

//Creacion de ventana de nueva coccion
function createNewCookingTypeWindow() {
    newCookingTypeWindow = new BrowserWindow({width: 400, height: 360, title: 'Nueva Receta'});

    createDevMenu(newCookingTypeWindow);
    
    newCookingTypeWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ingresar-coccion.html'),
        protocol: 'file',
        slashes: true
    }));

    newCookingTypeWindow.on('close', () =>{
        newCookingTypeWindow = null;
    });
};

//Crear ventana de recurso
function createResourceWindow() {
    newResourceWindow = new BrowserWindow({width: 400, height: 220, title: 'Nueva Recurso'});

    createDevMenu(newResourceWindow);

    newResourceWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ingresar-recurso.html'),
        protocol: 'file',
        slashes: true
    }));  
    
    newResourceWindow.on('close', () =>{
        newRateWindow = null;
        createCookingMenu();
    });
}

//Crear ventana de tarifas
function createRateWindow() {
    newRateWindow = new BrowserWindow({width: 400, height: 300, title: 'Nueva Tarifa'});

    createDevMenu(newRateWindow);

    newRateWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ingresar-tarifa.html'),
        protocol: 'file',
        slashes: true
    }));  
    
    newRateWindow.on('close', () =>{
        newRateWindow = null;
        createCookingMenu();
    });
}

//Crear ventana de nuevo producto
function createNewProductWindow() {
    newProductWindow = new BrowserWindow({ width: 600, height: 370, title: 'Nuevo Producto' });

    createDevMenu(newProductWindow);

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ingresar-productos.html'),
        protocol: 'file',
        slashes: true
    }));

    newProductWindow.on('close', () => {
        newProductWindow = null;
    });
};

//Ventana de confirmacion
function crearVentanaConfirmacion(ventanaOrigen) {
    ventanaConfirmacion = new BrowserWindow({width: 580, height: 200, title: ''});

    createDevMenu(ventanaConfirmacion);

    ventanaConfirmacion.loadURL(url.format({
        pathname: path.join(__dirname, 'vistas/html/ventana-confirmacion.html'),
        protocol: 'file',
        slashes: true
    }));

    //ventanaConfirmacion.webContents.send('Confirmacion:ventana', ventanaOrigen);
    ventanaEvento = ventanaOrigen;
    //console.log(ventanaEvento);

    ventanaConfirmacion.on('close', () =>{
        ventanaConfirmacion = null;
    });
}

//Eventos Ipc

//Evento de ventana de confirmacion
ipcMain.on('Confirmacion', (e, respuesta) => {
    ventanaConfirmacion.close();
    if (respuesta) {
        switch(ventanaEvento){
            case 'newCoockingWindow':
            //console.log('Entre en la ventana!');
            newCoockingWindow.webContents.send('BorrarTodo:dispositivo');
            break;

            case 'newProductsView':
            //console.log('Entre en la ventana!');
            newProductsView.webContents.send('BorrarTodo:ingrediente');
            break;

            default:
            break;
        }
    }
});

//Evento guardar nuevo recurso
ipcMain.on('Guardado:recurso', (e) =>{
    //newResourceWindow.webContents.send('Nuevo:recurso');
    newResourceWindow.close();
});

//Evento guardar nuevo producto
ipcMain.on('Guardado:ingrediente', (e, ingrediente) =>{
    newProductsView.webContents.send('Nuevo:ingrediente', ingrediente);
    newProductWindow.close();
});

//Evento guardar nueva tarifa
ipcMain.on('Guardado:tarifas', (e, tarifa) => {
    newCoockingWindow.webContents.send('Nuevo:tarifa', tarifa);
    newRateWindow.close();
});

//Evento guardar nuevo dispositivo de coccion
ipcMain.on('Guardado:dispositivo', (e, dispositivo) =>{
    newCoockingWindow.webContents.send('Nuevo:dispositivo', dispositivo);
    newCookingTypeWindow.close();
});

//Evento guardar nueva receta
ipcMain.on('Guardado:receta', (e) => {
    mainWindow.webContents.send('Nuevo:receta');
    newRecipeWindow.close();
});

// ipcMain.on('rate:new', (e, rate) =>{
//     console.log(rate);
//     newCoockingWindow.webContents.send('rate:new', rate);
//     newRateWindow.close();
// });

//ventanaConfirmacion.webContents.send('Confirmacion:ventana', 'newCoockingWindow');

//Evento modificar producto
// ipcMain.on('product:modify', (e, producto) =>{
    
// });

//Menu Principal
const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar nueva receta',
                accelerator: 'Ctrl+N',
                click() {
                    createNewRecipeWindow();
                }
            },
            {
                label: 'Borrar todas las recetas',
                click() {

                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Salir de la aplicacion',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {    
        label: 'Productos',
        submenu: [
            {
                label: 'Ver  todos los productos',
                accelerator: 'Ctrl+M',
                click() {
                    createNewProductsView();
                }
            }
        ]
    },  
    {  
        label: 'Dispositivos de Cocción',
        submenu: [
            {
                label: 'Ver dispositivos de Cocción',
                accelerator: 'Ctrl+B',
                click() {
                    createNewCookingWindow();
                }
            }
        ]
    }
];

//Menu de Ventana Coccion
const coccionMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar Dispositivo de Cocción',
                accelerator: 'Ctrl+N',
                click() {
                    createNewCookingTypeWindow();
                }
            },
            {
                label: 'Borrar todo',
                click() {
                    crearVentanaConfirmacion('newCoockingWindow');
                }
            }
        ]
    },
    {
        label: 'Tarifas',
        submenu: [
            {
                label: 'Agregar Nuevo Recurso',
                accelerator: 'Ctrl+M',
                click() {
                    createResourceWindow();
                }
            },
            {
                label: 'Agregar Valores de Tarifas',
                accelerator: 'Ctrl+L',
                click() {
                    createRateWindow();
                }
            },
            {
                label: 'Ver Valores de Tarifas',
                type: 'checkbox',
                checked: false,
                click() {
                    newCoockingWindow.webContents.send('rates:show');
                }
            }
        ]
    }
];

//Menu ventana de productos
const productosMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar nuevo producto',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow();
                }
            },
            {
                label: 'Borrar todo',
                click() {
                    crearVentanaConfirmacion('newProductsView');
                    //newProductsView.webContents.send('product:remove-all');
                }
            }
        ]
    }
];

//Añadir herramientas de desarrollador
function addDevMenu(menu) {
    if (process.env.NODE_ENV !== 'production') {
        if (menu[menu.length - 1].label !== 'DevTools') {
            menu.push({
                label: 'DevTools',
                submenu: [
                    {
                        label: 'Show/Hide Dev Tools',
                        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
                        click(item, focusedWindow) {
                            focusedWindow.toggleDevTools();
                        }
                    },
                    {
                        role: 'reload'
                    }
                ]
            })
        }
    }
}