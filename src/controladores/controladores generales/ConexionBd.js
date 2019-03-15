const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('prueba.db');

//Creacion de tablas sino existen

db.run("CREATE TABLE IF NOT EXISTS 'recurso' (`Id_recurso` INTEGER PRIMARY KEY AUTOINCREMENT,`Nombre_recurso`	TEXT,`Medida_recurso` TEXT)");
db.run("CREATE TABLE IF NOT EXISTS 'tarifa' ( `Id_tarifa` INTEGER PRIMARY KEY AUTOINCREMENT, `FK_recurso` INTEGER, `Precio_tarifa` NUMERIC , FOREIGN KEY ('FK_recurso') REFERENCES 'recurso'('Id_recurso'))");
//db.run("CREATE TABLE IF NOT EXISTS 'dispositivo' (`Id_dispositivo` INTEGER PRIMARY KEY AUTOINCREMENT, `Tipo_dispositivo` TEXT, `FK_recurso` INTEGER, `Consumo` NUMERIC, FOREIGN KEY(`FK_recurso`) REFERENCES `recurso`(`Id_recurso`))");
//db.run("CREATE TABLE IF NOT EXISTS 'ingrediente' (`Id_ingrediente` INTEGER PRIMARY KEY AUTOINCREMENT, `Nombre_ingrediente` TEXT,`Marca` TEXT, `U_medida` TEXT CHECK(U_medida IN ( 'Kg' , 'L', 'Un.' )), `cantidad_venta` NUMERIC, `precio_venta` NUMERIC)");
//db.run("CREATE TABLE IF NOT EXISTS 'receta' ( `Id_receta` INTEGER PRIMARY KEY AUTOINCREMENT, `Nombre_receta` TEXT, `FK_Dispositivo` INTEGER, `Tiempo_coccion` INTEGER , `Tiempo_preparacion` INTEGER, `Unidades` INTEGER ,FOREIGN KEY ('FK_dispositivo') REFERENCES 'dispositivos_coccion'('Id_dispositivo'))");
//db.run("CREATE TABLE IF NOT EXISTS 'compuesta' (`Id_compuesta`	INTEGER PRIMARY KEY AUTOINCREMENT,`FK_receta` INTEGER,`FK_ingrediente` INTEGER,`cantidad_ingr` NUMERIC, `precio_ingr` NUMERIC,FOREIGN KEY(`FK_receta`) REFERENCES `receta`(`Id_receta`),FOREIGN KEY(`FK_ingrediente`) REFERENCES `ingredientes`(`Id_ingrediente`))");

db.close();