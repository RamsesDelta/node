const { Router } = require('express');
const { check } = require('express-validator');
//const { validarCampos } = require('../middlewares/validar-campos')
//const { validarJWT } = require('../middlewares/validar-jwt')
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')
const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const { existeUsuarioPorId, emailExiste, esRoleValido } = require('../helpers/db-validators');


const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    validarJWT,
    //esAdminRole, Este es pra verificar un solo rol 
    tieneRole('ADMIN_ROLE', 'Ventas_ROLE'), // aquie se verifica algunos roles
    check('', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);


router.patch('/', usuariosPatch);





module.exports = router;