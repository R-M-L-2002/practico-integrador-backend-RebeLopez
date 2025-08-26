const { Producto } = require('../models'); 

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json({ data: productos, status: 200, message: 'Productos obtenidos de manera exitosa' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener productos', error: error.message });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ status: 404, message: 'Producto no encontrado' });

        res.json({ data: producto, status: 200, message: 'Producto encontrado' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al buscar el producto', error: error.message });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        if (!nombre || !precio) return res.status(400).json({ status: 400, message: 'Faltan datos obligatorios' });

        const nuevoProducto = await Producto.create({ nombre, precio });
        res.status(201).json({ data: nuevoProducto, status: 201, message: 'Producto creado con éxito' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear el producto', error: error.message });
    }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ status: 404, message: 'Producto no encontrado' });

        const { nombre, precio } = req.body;
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        await producto.save();
        res.json({ data: producto, status: 200, message: 'Producto editado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al editar producto', error: error.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ status: 404, message: 'Producto no encontrado' });

        await producto.destroy();
        res.json({ status: 200, message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar producto', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
