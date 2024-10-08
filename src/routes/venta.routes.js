// importar base de datos del archivo database de mysql2
import { Router } from 'express';
import pool from '../database/database.js';

const router = Router();

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT id, DATE_FORMAT(fecha_emision, "%Y-%m-%d") AS fecha_emision, motivo, situacion FROM orden_venta');
        console.log(result);
        res.render('venta/list', { ventas: result });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/add', async (req, res) => res.render ('venta/add') );

router.post('/add', async (req, res) => {
    const { fecha_emision, motivo, situacion } = req.body;
    try {
        await pool.query('INSERT INTO orden_venta (fecha_emision, motivo, situacion) VALUES (?, ?, ?)', [fecha_emision, motivo, situacion]);
        res.redirect('/list');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al crear la orden de venta');
    }
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('SELECT * FROM orden_venta WHERE id = ?', [id]);
        if (result.length > 0) {
            res.render('venta/edit', { ...result[0] });
        } else {
            res.status(404).send('Orden de venta no encontrada');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al cargar la orden de venta');
    }
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha_emision, motivo, situacion } = req.body;
    try {
        await pool.query('UPDATE orden_venta SET fecha_emision = ?, motivo = ?, situacion = ? WHERE id = ?', [fecha_emision, motivo, situacion, id]);
        res.redirect('/list');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al actualizar la orden de venta');
    }
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM orden_venta WHERE id =?', [id]);
        res.redirect('/list');
    } catch (err) {
        console.error(err.message);
        console.log('Error al eliminar la orden de venta');
    }
});


export default router;