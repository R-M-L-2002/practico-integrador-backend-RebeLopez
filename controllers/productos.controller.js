const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../data/productos.json')

const leerProductos = () => {
    const data = fs.readFileSync(filePath, 'utf8')

    return JSON.parse(data) 
}

let productos = leerProductos()

const escribirProductos = (productos) => {
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2))
}

const getProducts = (req, res) => {
    res.json({ data: productos, status: 200, message: 'Productos obtenidos de manera exitosa' })
}

const getProductById = (req, res) => {
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    if(!producto) 
        return res.json({ status: 404, message: 'Producto no enconrado' })

    res.json({ ata: producto, status: 200, message: 'Producto encontrado' })
}

const createProduct = (req, res) => {
    const nuevoProducto = req.body
    nuevoProducto.id = productos.length + 1
    productos.push(nuevoProducto)

    escribirProductos(productos)

    res.json({ status: 201, data: nuevoProducto, message: 'Producto creado con exito' })
}

const updateProduct = (req, res) => {
    const producto = productos.find(item => item.id === parseInt(req.params.id))
    if(!producto) 
        return res.json({ status: 404, message: 'Producto no enconrado' })

    const {nombre, precio} = req.body   
    producto.nombre = nombre || producto.nombre
    producto.precio = precio || producto.precio

    escribirProductos(productos)

    res.json({ status:201, message: 'producto editado exitosamente'})
} 

const deleteProduct = (req, res) => {
    let producto = productos.find(item => item.id === parseInt(req.params.id))
    if(!producto) 
        return res.json({ status: 404, message: 'Producto no enconrado' })

    productos = productos.filter(item => item.id !== producto.id)

    escribirProductos(productos)

    res.json({ status:201, message: 'producto eliminado con exito' })
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}