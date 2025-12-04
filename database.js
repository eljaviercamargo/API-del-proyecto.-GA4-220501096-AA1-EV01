const mongoose = require('mongoose');

// Usa una variable de entorno para la URI de MongoDB en producción
// En desarrollo, puedes usar 'mongodb://localhost:27017/kinesalud'
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kinesalud';

mongoose.connect(URI)
    .then(db => console.log('DB Kinesalud está conectada'))
    .catch(err => console.error('Error al conectar a la DB Kinesalud:', err));

module.exports = mongoose;