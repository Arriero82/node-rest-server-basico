const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
  const {nombre, alias} = req.query;
  res.json({
    msg: "get API - controller",
    nombre,
    alias
  });
};

const postUsers = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "post API - controller",
    nombre,
    edad,
  });
};

const putUsers = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - controller",
    id,
  });
};

const deleteUsers = (req = request, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
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
