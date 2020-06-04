"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Patron singleton para evitar que la clase se vuelva a crear en caso de tener varias instancias de la clase
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("clase inicializada. Este mensaje debe aparecer sólo una vez");
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        // Devuelve la instancia de la clasa o, si no existe, la crea de nuevo
        // De esta manera, cuando se instancie la clase múltiples veces (vía el "get instance"),
        // siempre devolverá la misma instancia
        return this._instance || (this._instance = new this());
    }
    // "static" para poder llamarla "MySQL.ejecutarQuery()"
    static ejecutarQuery(query, callback) {
        // No puede usarse "this.cnn" pq "cnn" es una propiedad de la Clase (y no es una propiedad estática).
        // Esto es por el patrón "Singleton", por lo que deberemos utilizar "instance"
        this.instance.cnn.query(query, (err, results, fileds) => {
            if (err) {
                console.log("Error en la query");
                console.log(err);
                return callback(err);
            }
            // if (results.length === 0) {
            // callback('El registro solicitado no existe');
            // } else {
            callback(null, results);
            // }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        this.conectado = true;
        console.log("BD online");
    }
}
exports.default = MySQL;
