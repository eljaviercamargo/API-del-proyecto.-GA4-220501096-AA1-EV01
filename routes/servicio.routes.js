// backend/routes/servicio.routes.js

const express = require('express');
const router = express.Router();

const servicioCtrl = require('../controllers/servicio.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.route('/')
    .get(authMiddleware, servicioCtrl.getServicios)
    .post(authMiddleware, servicioCtrl.createServicio);

router.route('/:id')
    .get(authMiddleware, servicioCtrl.getUnicoServicio)
    .put(authMiddleware, servicioCtrl.editarServicio)
    .delete(authMiddleware, servicioCtrl.eliminarServicio);

module.exports = router;
