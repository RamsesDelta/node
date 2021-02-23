const { response } = require('express')


const usuariosGet = (req, res = response) => {

    //const { nombre, apikey } = req.request.query

    res.json('Hello World')
}


const usuariosPost = (req, res = response) => {
    const body = req.body

    res.json({
        body
    })
}
const usuariosPut = (req, res = response) => {

    const { id } = req.params

    res.json({ id })
}

const usuariosPatch = (req, res = response) => {
    res.json('Hello World')
}

const usuariosDelete = (req, res = response) => {
    res.json('Hello World')
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}