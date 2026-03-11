const express = require('express');
const router = express.Router();

const pacienteCtrl = require('../controllers/paciente.controller');
// const authMiddleware = require('../middlewares/auth.middleware'); // temporalmente desactivado

// GET /api/pacientes/ -> Obtener todos los pacientes
// POST /api/pacientes/ -> Crear un nuevo paciente
router.route('/')
    .get(pacienteCtrl.getPacientes)
    .post(pacienteCtrl.createPaciente);

// Nueva ruta para la inserción masiva de pacientes
router.post('/bulk', pacienteCtrl.createMultiplesPacientes);

// GET /api/pacientes/:id -> Obtener un solo paciente por ID
// PUT /api/pacientes/:id -> Actualizar un paciente
// DELETE /api/pacientes/:id -> Eliminar un paciente
router.route('/:id')
    .get(pacienteCtrl.getUnicoPaciente)
    .put(pacienteCtrl.editarPaciente)
    .delete(pacienteCtrl.eliminarPaciente);

module.exports = router;