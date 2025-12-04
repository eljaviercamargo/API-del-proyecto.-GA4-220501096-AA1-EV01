// index.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// Importar y ejecutar la conexión a la base de datos
require('./database'); 

const app = express();

// --- CONFIGURACIÓN DE EXPRESS Y MIDDLEWARE ---
// Establecer el puerto
app.set('port', process.env.PORT || 3000);

// Middleware para logs de solicitudes HTTP
app.use(morgan('dev'));

// Middleware para parsear el body de las solicitudes a JSON
app.use(express.json());

// Orígenes permitidos para CORS
const allowedOrigins = [
  'http://localhost:4200',     // Ejemplo de Frontend Angular
  'http://localhost:3000',     // Si usas el mismo servidor para frontend/testing
  process.env.FRONTEND_URL     // URL de producción
];

// Configuración avanzada de CORS
app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin 'origin' (como apps móviles o Postman)
    if (!origin) return callback(null, true); 

    // Verificar si el origen está en la lista de permitidos
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log(`❌ CORS BLOCKED: ${origin}`);
    return callback(new Error('Origen no permitido por CORS'), false);
  },
  credentials: true
}));

// --- DEFINICIÓN DE RUTAS ---
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/servicios', require('./routes/servicio.routes'));
app.use('/api/productos-terapia', require('./routes/productoTerapia.routes'));

// --- INICIO DEL SERVIDOR ---
app.listen(app.get('port'), () => {
  console.log('🔥 Servidor activo en el puerto', app.get('port'));
});