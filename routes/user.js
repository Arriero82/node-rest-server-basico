const { Router } = require("express");
const { check } = require("express-validator");

/* const {validarJWT} = require('../middlewares/validar-jwt')
const { validarCampos } = require("../middlewares/validar-campos");
const {esAdminRole, tieneRole} = require("../middlewares/validar-roles"); */

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  idExiste,
} = require("../helpers/db-validators");

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("correo", "el correo no es valido").isEmail(),
    check("correo").custom((correo) => emailExiste(correo)),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    //check('rol', "No es un rol permitido").isIn(['ADMIN_ROL', 'USER_ROL']),
    check("rol").custom((rol) => esRolValido(rol)),
    validarCampos,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom((id) => idExiste(id)),
    check("rol").custom((rol) => esRolValido(rol)),
    validarCampos,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    validarJWT,
    //esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom((id) => idExiste(id)),
    validarCampos,
  ],
  deleteUsers
);

router.patch("/", patchUsers);

module.exports = router;
