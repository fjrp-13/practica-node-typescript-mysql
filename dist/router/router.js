"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, resp) => {
    const query = 'SELECT * FROM heroes';
    mysql_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            resp.status(400).json({
                success: false,
                error: err
            });
        }
        else {
            resp.json({
                success: true,
                data: results
            });
        }
    });
});
router.get('/heroes/:id', (req, resp) => {
    const id = req.params.id;
    const escapedId = mysql_1.default.instance.cnn.escape(id); // Evitar SQL Injection
    const query = `SELECT * FROM heroes WHERE id = ${escapedId}`;
    mysql_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            resp.status(400).json({
                success: false,
                error: err
            });
        }
        else {
            resp.json({
                success: true,
                data: results
            });
        }
    });
});
exports.default = router;
