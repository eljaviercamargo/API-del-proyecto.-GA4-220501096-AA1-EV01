// backend/controllers/productoTerapia.controller.js

const productoTerapiaCtrl = {};
const ProductoTerapia = require('../models/productoTerapia');

// 1. Obtener TODOS los productos de terapia (GET)
productoTerapiaCtrl.getProductosTerapia = async (req, res) => {
    try {
        const productos = await ProductoTerapia.find();
        res.json(productos);
    } catch (err) {
        console.error('Error al obtener productos de terapia:', err);
        res.status(500).json({ error: 'Error al obtener los productos de terapia', details: err.message });
    }
};

// 2. Crear un nuevo Producto de Terapia (POST)
productoTerapiaCtrl.createProductoTerapia = async (req, res) => {
    const { nombre, descripcion, precio, terapia, unidadMedida, activo } = req.body;

    // Validación básica
    if (!nombre || !descripcion || !precio || terapia === undefined || !unidadMedida) {
        return res.status(400).json({ message: 'Todos los campos requeridos (nombre, descripción, precio, terapia, unidadMedida) son obligatorios.' });
    }
    
    const newProductoTerapia = new ProductoTerapia({
        nombre,
        descripcion,
        precio,
        terapia,
        unidadMedida,
        activo: activo !== undefined ? activo : true
    });

    try {
        await newProductoTerapia.save();
        console.log('Producto de Terapia guardado en DB:', newProductoTerapia.nombre);
        res.status(201).json({ status: 'Producto de Terapia guardado exitosamente', producto: newProductoTerapia });
    } catch (err) {
        console.error('Error al guardar el producto de terapia:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Datos del producto incompletos o incorrectos', details: err.message });
        }
        if (err.code === 11000) { // Error de duplicidad (nombre único)
            return res.status(400).json({ error: 'Ya existe un producto de terapia con ese nombre.', details: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor al guardar el producto de terapia', details: err.message });
    }
};

// 3. Obtener UN SOLO producto de terapia por ID (GET por ID)
productoTerapiaCtrl.getUnicoProductoTerapia = async (req, res) => {
    try {
        const producto = await ProductoTerapia.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto de terapia no encontrado' });
        }
        res.json(producto);
    } catch (err) {
        console.error('Error al obtener un solo producto de terapia:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'ID de producto de terapia inválido.', details: err.message });
        }
        res.status(500).json({ error: 'Error al obtener el producto de terapia por ID', details: err.message });
    }
};

// 4. Actualizar un Producto de Terapia (PUT)
productoTerapiaCtrl.editarProductoTerapia = async (req, res) => {
    const { nombre, descripcion, precio, terapia, unidadMedida, activo } = req.body;
    const updateData = { nombre, descripcion, precio, terapia, unidadMedida, activo };

    try {
        const productoActualizado = await ProductoTerapia.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto de terapia no encontrado para actualizar' });
        }
        res.json({ status: 'Producto de Terapia actualizado', producto: productoActualizado });
    } catch (err) {
        console.error('Error al actualizar producto de terapia:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Datos de actualización incompletos o incorrectos', details: err.message });
        }
        if (err.code === 11000) { // Error de duplicidad al actualizar el nombre
            return res.status(400).json({ error: 'Ya existe otro producto de terapia con ese nombre.', details: err.message });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'ID de producto de terapia inválido para actualizar.', details: err.message });
        }
        res.status(500).json({ error: 'Error al actualizar el producto de terapia', details: err.message });
    }
};

// 5. Eliminar un Producto de Terapia (DELETE)
productoTerapiaCtrl.eliminarProductoTerapia = async (req, res) => {
    try {
        const productoEliminado = await ProductoTerapia.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).json({ message: 'Producto de terapia no encontrado para eliminar' });
        }
        res.json({ status: 'Producto de Terapia eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar producto de terapia:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'ID de producto de terapia inválido para eliminar.', details: err.message });
        }
        res.status(500).json({ error: 'Error al eliminar el producto de terapia', details: err.message });
    }
};

module.exports = productoTerapiaCtrl;