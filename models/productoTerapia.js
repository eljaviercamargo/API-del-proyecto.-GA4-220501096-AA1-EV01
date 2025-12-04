// backend/models/productoTerapia.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoTerapiaSchema = new Schema({
    nombre: { type: String, required: true, trim: true, unique: true }, // Nombre del producto (ej. "Electroestimulador", "Bandas Elásticas")
    descripcion: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 },
    // Aquí 'terapia' representa la cantidad disponible o el número de sesiones/unidades
    terapia: { type: Number, required: true, min: 0, default: 0 }, // Este campor representa la terapia que va a tomar el paciente, se ingresa de forma manual
    unidadMedida: { type: String, required: true, trim: true }, // Ej. "unidades", "sesiones", "metros"
    activo: { type: Boolean, default: true } // Para indicar si el producto está disponible
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('ProductoTerapia', ProductoTerapiaSchema);