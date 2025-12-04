const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const PacienteSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    rut: { type: String, required: true, unique: true, trim: true }, // El RUT debe ser único
    telefono: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // Email debe ser único y en minúsculas
    fecha_nacimiento: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'paciente' }
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

// Middleware pre-save para hashear la contraseña
PacienteSchema.pre('save', async function(next) {
    // Solo hashear la contraseña si ha sido modificada (o es nueva)
    if (!this.isModified('password')) { 
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
PacienteSchema.methods.matchPassword = async function(enteredPassword) {
    // Compara la contraseña ingresada con la contraseña hasheada en la DB
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Paciente', PacienteSchema); // Usa 'Paciente' como nombre del modelo (convención)