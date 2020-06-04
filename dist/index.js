"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// comando en la console para crear el archivo de configuración de Typescript (tsconfig.json):
// tsc --init 
// comando para convertir el código Typescript a su representación Javascript:
// tsc
// (el comando "tsc" solo funcionará si la versión de Typescript es >=2 y está configurado el archivo "tsconfig.json" )
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const server = server_1.default.init(3000);
server.app.use(router_1.default);
//const mysql = new MySQL();
// Llamar a la propiedad, que a su vez llamará al Get
//MySQL.instance;
server.start(() => {
    console.log("Servidor corriendo en el puerto 3000");
});
