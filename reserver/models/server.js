const express = require('express')
const cors = require('cors')
const { json } = require('express')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.router()
    }

    middlewares() {
        //cors
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))
    }

    router() {
        this.app.use('/api/usuarios', require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puero', this.port)
        })
    }

}

module.exports = Server