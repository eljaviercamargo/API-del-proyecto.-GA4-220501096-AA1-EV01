// index.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./database');

const app = express();

// 🔥 CAMBIADO A 4000
app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', // React
  'http://localhost:4200',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log(`❌ CORS BLOCKED: ${origin}`);
    return callback(new Error('Origen no permitido por CORS'), false);
  },
  credentials: true
}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));
app.use('/api/productos-terapia', require('./routes/productoTerapia.routes'));

app.listen(app.get('port'), () => {
  console.log('🔥 Servidor activo en el puerto', app.get('port'));
});