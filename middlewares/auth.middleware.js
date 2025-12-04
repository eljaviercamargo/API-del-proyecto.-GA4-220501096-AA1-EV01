const jwt = require('jsonwebtoken');
const Paciente = require('../models/paciente');
const config = require('config');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado, falta token.' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.userId = decoded.id;

        // Intentamos buscar paciente PERO NO ES OBLIGATORIO
        const paciente = await Paciente.findById(decoded.id).select('-password');

        // Guardamos paciente solo si existe
        req.paciente = paciente || null;

        // Dejamos pasar igual
        next();

    } catch (err) {
        console.error('Error en authMiddleware:', err);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;

