const { Usuario } = require('../models');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({ data: usuarios, status: 200, message: 'Usuarios obtenidos exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });

        res.json({ data: usuario, status: 200, message: 'Usuario encontrado' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al buscar usuario', error: error.message });
    }
};

// Crear usuario
const createUser = async (req, res) => {
    const { nombre, email, edad, password, rol } = req.body;
    try {
        if (!nombre || !email || !password) {
            return res.status(400).json({ status: 400, message: 'Faltan datos obligatorios' });
        }

        const nuevoUsuario = await Usuario.create({ nombre, email, edad, password, rol });
        res.status(201).json({ data: nuevoUsuario, status: 201, message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear usuario', error: error.message });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });

        const { nombre, email, edad, password, rol } = req.body;

        usuario.nombre = nombre || usuario.nombre;
        usuario.email = email || usuario.email;
        usuario.edad = edad || usuario.edad;
        usuario.password = password || usuario.password;
        usuario.rol = rol || usuario.rol;

        await usuario.save();

        res.json({ data: usuario, status: 200, message: 'Usuario editado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al editar usuario', error: error.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });

        await usuario.destroy();

        res.json({ status: 200, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};