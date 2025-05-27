const fs = require('fs')
const path = require('path')
const { json } = require('stream/consumers')
const filePath = path.join(__dirname, '../data/usuarios.json')

const leerUsuarios = () => {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
}

let usuarios = leerUsuarios()

const escribiUsuarios = (usuarios) => {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2))
}

const getUsers = (req, res) => {
    res.json({ data: usuarios, status: 200, message: 'Usuarios obtenidos exitosamente' })
}

const getUsersById = (req, res) => {
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if(!usuario) 
        return res.json({ status:404, message: 'Usuario no encontrado'})

    res.json({ data: usuario, status: 200, message: 'Usuario encontrado' })
}   

const createUser = (req, res) => {
    const nuevoUsuario = req.body
    nuevoUsuario.id = usuarios.length + 1
    usuarios.push(nuevoUsuario)

    escribiUsuarios(usuarios)

    res.json({ status: 201, data: nuevoUsuario, message: 'Usuario creado exitosamente' })
}

const updateUser = (req, res) => {
    const usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if(!usuario)
        return res.json({ status: 404, message: 'Usuario no encontrado' })

    const {name, email, age} = req.body
    usuario.name = name || usuario.name
    usuario.email = email || usuario.email
    usuario.age = age || usuario.age
    
    escribiUsuarios(usuarios)

    res.json({ status:201, message: 'Usuario editado exitosamente' })
}

const deleteUser = (req, res) => {
    let usuario = usuarios.find(item => item.id === parseInt(req.params.id))
    if(!usuario)
        return res.json({ status: 404, message: 'Usuario no encontrado' })

    usuarios = usuarios.filter(item => item.id !== usuario.id)

    escribiUsuarios(usuarios)

    res.json({ status:201, message: 'Usuario eliminado exitosamente'})
}

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
}