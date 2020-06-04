import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, resp: Response) => {
    const query = 'SELECT * FROM heroes';
    MySQL.ejecutarQuery(query, (err: any, results: Object[]) => {
        if (err) {
            resp.status(400).json({
                success: false,
                error: err
            });
        } else {
            resp.json({
                success: true,
                data: results
            })
        }
    });
});

router.get('/heroes/:id', (req: Request, resp: Response) => {
    const id = req.params.id;
    const escapedId = MySQL.instance.cnn.escape(id); // Evitar SQL Injection

    const query = `SELECT * FROM heroes WHERE id = ${escapedId}`;
    MySQL.ejecutarQuery(query, (err: any, results: Object[]) => {
        if (err) {
            resp.status(400).json({
                success: false,
                error: err
            });
        } else {
            resp.json({
                success: true,
                data: results
            })
        }
    });
});

export default router;