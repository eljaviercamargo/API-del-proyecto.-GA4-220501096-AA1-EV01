    const pacienteCtrl = {};
    const Paciente = require('../models/paciente');

    // --- Métodos CRUD para Pacientes ---

    // 1. Obtener TODOS los pacientes (GET)
    pacienteCtrl.getPacientes = async (req, res) => {
        try {
            // Excluye el campo 'password' de los resultados por seguridad
            const pacientes = await Paciente.find().select('-password'); 
            res.json(pacientes);
        } catch (err) {
            console.error('Error al obtener pacientes:', err);
            res.status(500).json({ error: 'Error al obtener los pacientes', details: err.message });
        }
    };

    // 2. Crear un nuevo Paciente (POST)
    pacienteCtrl.createPaciente = async (req, res) => {
        const { nombre, apellido, rut, telefono, email, fecha_nacimiento, password } = req.body;

        // Si estás creando un paciente individualmente, probablemente necesites la contraseña
        if (!nombre || !apellido || !rut || !telefono || !email || !fecha_nacimiento || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos para crear un paciente.' });
        }

        const newPaciente = new Paciente({
            nombre,
            apellido,
            rut,
            telefono,
            email,
            fecha_nacimiento,
            password // La contraseña será hasheada por el pre-save hook
        });

        try {
            await newPaciente.save();
            console.log('Paciente guardado en DB:', newPaciente.email); // No loguear la contraseña
            res.status(201).json({ status: 'Paciente guardado exitosamente', _id: newPaciente._id, email: newPaciente.email });
        } catch (err) {
            console.error('Error al guardar el paciente:', err);
            if (err.name === 'ValidationError') {
                return res.status(400).json({ error: 'Datos incompletos o incorrectos', details: err.message });
            }
            if (err.code === 11000) {
                let field = err.message.includes('email_1') ? 'email' : 'RUT';
                return res.status(400).json({ error: `El ${field} ya existe`, details: err.message });
            }
            res.status(500).json({ error: 'Error interno del servidor al guardar', details: err.message });
        }
    };

    // 3. Obtener UN SOLO paciente por ID (GET por ID)
    pacienteCtrl.getUnicoPaciente = async (req, res) => {
        try {
            const paciente = await Paciente.findById(req.params.id).select('-password'); // Excluir password
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente no encontrado' });
            }
            res.json(paciente);
        } catch (err) {
            console.error('Error al obtener un solo paciente:', err);
            // Manejo de error si el ID no tiene el formato correcto de ObjectId
            if (err.name === 'CastError') {
                return res.status(400).json({ error: 'ID de paciente inválido.', details: err.message });
            }
            res.status(500).json({ error: 'Error al obtener el paciente por ID', details: err.message });
        }
    };

    // 4. Actualizar un Paciente (PUT)
    pacienteCtrl.editarPaciente = async (req, res) => {
        const { nombre, apellido, rut, telefono, email, fecha_nacimiento, password } = req.body;
        // No permitir actualizar la contraseña directamente desde esta ruta CRUD general si tienes una ruta de cambio de contraseña dedicada
        // Si necesitas actualizar la contraseña, se manejaría con bcrypt y no directamente aquí
        const updateData = { nombre, apellido, rut, telefono, email, fecha_nacimiento };

        try {
            const pacienteActualizado = await Paciente.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-password'); // Excluir password
            if (!pacienteActualizado) {
                return res.status(404).json({ message: 'Paciente no encontrado para actualizar' });
            }
            res.json({ status: 'Paciente actualizado', paciente: pacienteActualizado });
        } catch (err) {
            console.error('Error al actualizar paciente:', err);
            if (err.name === 'ValidationError') {
                return res.status(400).json({ error: 'Datos de actualización incompletos o incorrectos', details: err.message });
            }
            if (err.code === 11000) {
                let field = err.message.includes('email_1') ? 'email' : 'RUT';
                return res.status(400).json({ error: `El ${field} actualizado ya existe.`, details: err.message });
            }
            if (err.name === 'CastError') {
                return res.status(400).json({ error: 'ID de paciente inválido para actualizar.', details: err.message });
            }
            res.status(500).json({ error: 'Error al actualizar el paciente', details: err.message });
        }
    };

    // 5. Eliminar un Paciente (DELETE)
    pacienteCtrl.eliminarPaciente = async (req, res) => {
        try {
            const pacienteEliminado = await Paciente.findByIdAndDelete(req.params.id);
            if (!pacienteEliminado) {
                return res.status(404).json({ message: 'Paciente no encontrado para eliminar' });
            }
            res.json({ status: 'Paciente eliminado exitosamente' });
        } catch (err) {
            console.error('Error al eliminar paciente:', err);
            if (err.name === 'CastError') {
                return res.status(400).json({ error: 'ID de paciente inválido para eliminar.', details: err.message });
            }
            res.status(500).json({ error: 'Error al eliminar el paciente', details: err.message });
        }
    };

    // 6. Crear múltiples Pacientes (POST)
    pacienteCtrl.createMultiplesPacientes = async (req, res) => {
        const pacientesArray = req.body;
        if (!Array.isArray(pacientesArray) || pacientesArray.length === 0) {
            return res.status(400).json({ error: 'Se esperaba un array de pacientes para la inserción múltiple.' });
        }

        try {
            // insertManyWithOptions: Permite `ordered: false` para que si uno falla, los demás sigan.
            // `rawResult: true` para obtener detalles de los errores individuales.
            const result = await Paciente.insertMany(pacientesArray, { ordered: false, rawResult: true });
            
            // Contar documentos insertados correctamente
            const insertedCount = result.insertedIds ? Object.keys(result.insertedIds).length : 0;
            
            console.log('Múltiples pacientes guardados en DB. Insertados:', insertedCount);
            
            if (result.writeErrors && result.writeErrors.length > 0) {
                // Manejar errores de inserción individuales (ej. duplicados)
                const errors = result.writeErrors.map(err => ({
                    index: err.index,
                    code: err.code,
                    message: err.errmsg || err.message,
                    op: err.op // El documento que intentó insertar y falló
                }));
                return res.status(207).json({ // 207 Multi-Status para indicar resultados mixtos
                    status: 'Algunos pacientes fueron guardados, pero hubo errores.',
                    insertedCount: insertedCount,
                    errors: errors,
                    message: 'Verifica los detalles de los errores.'
                });
            }

            res.status(201).json({
                status: 'Múltiples pacientes guardados exitosamente',
                count: insertedCount,
                message: `${insertedCount} pacientes insertados.`
            });
        } catch (err) {
            console.error('Error al guardar múltiples pacientes:', err);
            // `insertMany` con `ordered: false` aún puede lanzar un `BulkWriteError` si hay errores.
            // `err.writeErrors` contendrá los detalles de los errores individuales.
            if (err.name === 'BulkWriteError' || err.name === 'ValidationError') {
                const errors = err.writeErrors ? err.writeErrors.map(e => ({
                    index: e.index,
                    code: e.code,
                    message: e.errmsg || e.message,
                    op: e.op
                })) : [];
                return res.status(400).json({ 
                    error: 'Errores en la inserción de algunos pacientes.', 
                    details: err.message, 
                    writeErrors: errors 
                });
            }
            res.status(500).json({ error: 'Error interno del servidor al guardar múltiples pacientes', details: err.message });
        }
    };

    module.exports = pacienteCtrl;