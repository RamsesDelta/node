const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategori } = require('../controllers/categorias');
const { existeCategoriaPorId, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias)

router.get('/:id', [
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], actualizarCategoria)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Monog valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategori)


module.exports = router