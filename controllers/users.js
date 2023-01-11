const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  //Promise.all se asegura de esperar la respuesta de ambas antes de continuar, antes la cuenta de documentos y los usuarios que traia la busqueda eran constantes con await separadas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({total, usuarios});
};

const postUsers = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();
  res.json({
    usuario,
  });
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const deleteUsers = async (req = request, res = response) => {
  const {id} = req.params;

  //eliminacion de la base de datos del usuario
  //const usuario = await Usuario.findByIdAndDelete(id)

  const user = await Usuario.findByIdAndUpdate(id, {estado: false})
  const usuarioAutenticado = req.usuario;
  res.json({user, usuarioAutenticado});
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
};
