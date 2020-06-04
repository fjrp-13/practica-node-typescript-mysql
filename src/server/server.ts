/* 
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');





server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

}); */

import express = require('express');
import path = require('path');

export default class Server  {
    public app: express.Application;
    public port: Number;

    constructor(puerto: Number) {
        this.port = puerto;
        this.app = express();
    }

    static init(puerto: Number) {
        return new Server(puerto);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    // start(callback: Function) {
    //     this.app.listen(this.port, callback);
    // }
    start(callback: (...args: any[]) => void) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }


}
