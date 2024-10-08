import { Router } from 'express';
import pool from '../database/database.js';

const router = Router();

router.get('/labo_list', async (req, res) => {
    try {
        const [result] = await pool.query('select * from cod_lab');
        console.log(result);
        res.render('laboratorio/labo_list', { laboratorio: result });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/labo_add', async (req, res) => res.render ('laboratorio/labo_add'));

router.post('/labo_add', async (req, res) => {
    try {
        const { razon_social, direccion, telefono, email, contacto } = req.body;
        await pool.query('INSERT INTO cod_lab (razon_social, direccion, telefono, email, contacto) VALUES (?, ?, ?, ?, ?)', [razon_social, direccion, telefono, email, contacto]);
        res.redirect('/labo_list');
        console.log('Laboratorio agregado correctamente');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/labo_edit/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const [result] = await pool.query('SELECT * FROM cod_lab WHERE id =?', [id]);
        if (result.length > 0) {
            res.render('laboratorio/labo_edit', { ...result[0] }); 
        } else {
            res.status(404).send('Orden de laboratorio no encontrada');
        }
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/labo_edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const {razon_social, direccion, telefono, email, contacto } = req.body;
        await pool.query('UPDATE cod_lab SET razon_social =?, direccion =?, telefono =?, email =?, contacto =? WHERE id =?', [razon_social, direccion, telefono, email, contacto, id]);
        res.redirect('/labo_list');
        console.log('Laboratorio actualizado correctamente');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/labo_delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cod_lab WHERE id =?', [id]);
        res.redirect('/labo_list');
        console.log('Laboratorio eliminado correctamente');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


export default router;