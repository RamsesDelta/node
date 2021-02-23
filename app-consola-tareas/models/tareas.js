const Tarea = require('./tarea')

class Tareas {

    listado = {}

    constructor() {
        this.listado = {}
    }

    get listadoArr() {
        const listado = []
        Object.keys(this.listado).forEach(key => {
            const tarea = this.listado[key]
            listado.push(tarea)
        })
        return listado
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this.listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this.listado[tarea.id] = tarea
    }

    listadoCompletado() {
        console.log()
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green
            const { desc, completadoEn } = tarea
            const estado = (completadoEn) ? 'Completado'.green : 'Pediente'.red
            console.log(`${idx} ${desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log()
        let contador = 0
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea
            const estado = (completadoEn) ? 'Completado'.green : 'Pediente'.red
            if (completadas) {
                if (completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green} `)
                }
            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${estado} `)
                }
            }
        })
    }

    borrarTarea(id = '') {
        if (this.listado[id]) {
            delete this.listado[id]
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this.listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this.listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas