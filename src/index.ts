// comando en la console para crear el archivo de configuración de Typescript (tsconfig.json):
// tsc --init 
// comando para convertir el código Typescript a su representación Javascript:
// tsc
// (el comando "tsc" solo funcionará si la versión de Typescript es >=2 y está configurado el archivo "tsconfig.json" )
import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3000);

server.app.use(router);


//const mysql = new MySQL();
// Llamar a la propiedad, que a su vez llamará al Get
//MySQL.instance;


server.start(() => {
    console.log("Servidor corriendo en el puerto 3000");
});