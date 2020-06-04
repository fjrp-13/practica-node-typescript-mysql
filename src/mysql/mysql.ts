// Patron singleton para evitar que la clase se vuelva a crear en caso de tener varias instancias de la clase
import mysql = require('mysql');

export default class MySQL {
    // Patron singleton
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;
    constructor() {
        console.log("clase inicializada. Este mensaje debe aparecer sólo una vez");
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });

        this.conectarDB();
    }

    public static get instance() {
        // Devuelve la instancia de la clasa o, si no existe, la crea de nuevo
        // De esta manera, cuando se instancie la clase múltiples veces (vía el "get instance"),
        // siempre devolverá la misma instancia
        return this._instance || (this._instance = new this());
    }

    // "static" para poder llamarla "MySQL.ejecutarQuery()"
    public static ejecutarQuery( query: string, callback: Function) {
        // No puede usarse "this.cnn" pq "cnn" es una propiedad de la Clase (y no es una propiedad estática).
        // Esto es por el patrón "Singleton", por lo que deberemos utilizar "instance"
        this.instance.cnn.query(query, (err, results: Object[], fileds) => {
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

    private conectarDB() {
        this.cnn.connect( (err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
             }
        })
        this.conectado = true;
        console.log("BD online");
    }
}
