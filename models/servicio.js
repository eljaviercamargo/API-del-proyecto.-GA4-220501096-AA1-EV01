// backend/models/servicio.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define el esquema (la plantilla) para un solo Servicio
const ServicioSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 }, // Precio no puede ser negativo
    duracion_minutos: { type: Number, required: true, min: 1 }, // Duración mínima de 1 minuto
    activo: { type: Boolean, default: true } // Para saber si el servicio está activo o no
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

// Crea el Modelo de Mongoose. 'Servicio' (singular, minúscula)
// Esto creará una colección llamada 'servicios' en tu DB 'kinesalud'.
module.exports = mongoose.model('Servicio', ServicioSchema); // Usa 'Servicio' como nombre del modelo (convención)