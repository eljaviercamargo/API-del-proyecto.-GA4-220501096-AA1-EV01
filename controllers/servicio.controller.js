// backend/controllers/servicio.controller.js

const servicioCtrl = {}; // <-- ¡Asegúrate de que esto esté aquí y sea un objeto vacío al principio!

// Importa el modelo de Servicio
const Servicio = require('../models/servicio');

// --- Métodos CRUD para Servicios ---

// 1. Obtener TODOS los servicios (GET)
servicioCtrl.getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.json(servicios);
    } catch (err) {
        console.error('Error al obtener servicios:', err);
        res.status(500).json({ error: 'Error al obtener los servicios', details: err.message });
    }
};

// 2. Crear un nuevo Servicio (POST)
servicioCtrl.createServicio = async (req, res) => {
    const { nombre, descripcion, precio, duracion_minutos, activo } = req.body;
    const newServicio = new Servicio({
        nombre,
        descripcion,
        precio,
        duracion_minutos,
        activo
    });
    try {
        await newServicio.save();
        console.log('Servicio guardado en DB:', newServicio);
        res.status(201).json({ status: 'Servicio guardado exitosamente', servicio: newServicio });
    } catch (err) {
        console.error('Error al guardar el servicio:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Datos de servicio incompletos o incorrectos', details: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor al guardar el servicio', details: err.message });
    }
};

// 3. Obtener UN SOLO servicio por ID (GET por ID)
servicioCtrl.getUnicoServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(servicio);
    } catch (err) {
        console.error('Error al obtener un solo servicio:', err);
        res.status(500).json({ error: 'Error al obtener el servicio por ID', details: err.message });
    }
};

// 4. Actualizar un Servicio (PUT)
servicioCtrl.editarServicio = async (req, res) => {
    const { nombre, descripcion, precio, duracion_minutos, activo } = req.body;
    try {
        const servicioActualizado = await Servicio.findByIdAndUpdate(req.params.id, {
            nombre,
            descripcion,
            precio,
            duracion_minutos,
            activo
        }, { new: true, runValidators: true });
        if (!servicioActualizado) {
            return res.status(404).json({ message: 'Servicio no encontrado para actualizar' });
        }
        res.json({ status: 'Servicio actualizado', servicio: servicioActualizado });
    } catch (err) {
        console.error('Error al actualizar servicio:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Datos de actualización incompletos o incorrectos', details: err.message });
        }
        res.status(500).json({ error: 'Error al actualizar el servicio', details: err.message });
    }
};

// 5. Eliminar un Servicio (DELETE)
servicioCtrl.eliminarServicio = async (req, res) => {
    try {
        const servicioEliminado = await Servicio.findByIdAndDelete(req.params.id);
        if (!servicioEliminado) {
            return res.status(404).json({ message: 'Servicio no encontrado para eliminar' });
        }
        res.json({ status: 'Servicio eliminado' });
    } catch (err) {
        console.error('Error al eliminar servicio:', err);
        res.status(500).json({ error: 'Error al eliminar el servicio', details: err.message });
    }
};

module.exports = servicioCtrl;