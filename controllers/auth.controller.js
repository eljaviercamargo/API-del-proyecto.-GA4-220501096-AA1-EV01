const authCtrl = {};
const Paciente = require('../models/paciente');
const jwt = require('jsonwebtoken');
const config = require('config'); // <<-- ¡AÑADE ESTA LÍNEA para usar el paquete 'config'!

// Función auxiliar para generar el token
const generateToken = (id) => {
    // Usa config.get('jwtSecret') para obtener la clave secreta de forma consistente
    return jwt.sign({ id }, config.get('jwtSecret'), { expiresIn: '1h' }); 
};

// 1. Registro de un nuevo Paciente
authCtrl.registerPaciente = async (req, res) => {
    const { nombre, apellido, rut, telefono, email, fecha_nacimiento, password } = req.body;

    if (!nombre || !apellido || !rut || !telefono || !email || !fecha_nacimiento || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos para el registro.' });
    }

    try {
        const pacienteExists = await Paciente.findOne({ $or: [{ email }, { rut }] });
        if (pacienteExists) {
            return res.status(400).json({ message: 'El email o RUT ya está registrado.' });
        }

        const newPaciente = new Paciente({
            nombre,
            apellido,
            rut,
            telefono,
            email,
            fecha_nacimiento,
            password
        });

        await newPaciente.save();
        const token = generateToken(newPaciente._id);

        res.status(201).json({
            message: 'Registro exitoso',
            _id: newPaciente._id,
            nombre: newPaciente.nombre,
            email: newPaciente.email,
            token
        });

    } catch (err) {
        console.error('Error al registrar paciente:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Datos de registro incompletos o incorrectos', details: err.message });
        }
        if (err.code === 11000) {
            let field = err.message.includes('email_1') ? 'email' : 'RUT';
            return res.status(400).json({ error: `El ${field} ya existe.`, details: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor al registrar', details: err.message });
    }
};

// 2. Inicio de Sesión de Paciente
authCtrl.loginPaciente = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    try {
        const paciente = await Paciente.findOne({ email });

        if (!paciente) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        const isMatch = await paciente.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        const token = generateToken(paciente._id);

        res.json({
            message: 'Inicio de sesión exitoso',
            _id: paciente._id,
            nombre: paciente.nombre,
            email: paciente.email,
            token
        });

    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ error: 'Error interno del servidor al iniciar sesión', details: err.message });
    }
};

authCtrl.me = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.userId).select('-password');

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json(paciente);

    } catch (err) {
        console.error('Error en /me:', err);
        res.status(500).json({ message: 'Error interno', details: err.message });
    }
};

module.exports = authCtrl;
