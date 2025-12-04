const express = require('express');
const router = express.Router();

const pacienteCtrl = require('../controllers/paciente.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// GET /api/pacientes/ -> Obtener todos los pacientes (PROTEGIDA)
// POST /api/pacientes/ -> Crear un nuevo paciente (NO PROTEGIDA, ya que es el registro público)
router.route('/')
    .get(authMiddleware, pacienteCtrl.getPacientes)
    .post(pacienteCtrl.createPaciente);

// Nueva ruta para la inserción masiva de pacientes (PROTEGIDA)
router.post('/bulk', authMiddleware, pacienteCtrl.createMultiplesPacientes);

// GET /api/pacientes/:id -> Obtener un solo paciente por ID (PROTEGIDA)
// PUT /api/pacientes/:id -> Actualizar un paciente por ID (PROTEGIDA)
// DELETE /api/pacientes/:id -> Eliminar un paciente por ID (PROTEGIDA)
router.route('/:id')
    .get(authMiddleware, pacienteCtrl.getUnicoPaciente)
    .put(authMiddleware, pacienteCtrl.editarPaciente)
    .delete(authMiddleware, pacienteCtrl.eliminarPaciente);

module.exports = router;
