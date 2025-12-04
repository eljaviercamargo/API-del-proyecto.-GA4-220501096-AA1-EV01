// backend/routes/productoTerapia.routes.js

const express = require('express');
const router = express.Router();

const productoTerapiaCtrl = require('../controllers/productoTerapia.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas estas rutas requerirán autenticación
router.route('/')
    .get(authMiddleware, productoTerapiaCtrl.getProductosTerapia)
    .post(authMiddleware, productoTerapiaCtrl.createProductoTerapia);

router.route('/:id')
    .get(authMiddleware, productoTerapiaCtrl.getUnicoProductoTerapia)
    .put(authMiddleware, productoTerapiaCtrl.editarProductoTerapia)
    .delete(authMiddleware, productoTerapiaCtrl.eliminarProductoTerapia);

module.exports = router;
